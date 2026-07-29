from __future__ import annotations

import hashlib
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import Request, urlopen


BASE = "https://www.bespoke-aviation.com"
SLUGS = [
    "our-fleet",
    "citation-mustang",
    "citation-m2",
    "citation-cj2",
    "citation-cj3",
    "citation-xls",
    "embraer-phenom-300",
    "bombardier-challenger-605",
    "bombardier-global-express",
    "dassault-falcon-7x",
    "gulfstream-g550",
    "beech-king-air-200-gt",
    "embraer-legacy-600-650",
]
OUTPUT = Path(__file__).parent / "Public" / "fleet"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
EXCLUDED = (
    "logo",
    "favicon",
    "icon-",
    "avatar",
    "air-charter-association",
    "aca-logo",
    "bespoke-aviation-logo",
)
URL_RE = re.compile(r"url\((['\"]?)(.*?)\1\)", re.I)
WP_SIZE_RE = re.compile(r"-\d+x\d+(?=\.[^.]+$)", re.I)


def page_url(slug: str) -> str:
    return f"{BASE}/our-fleet/" if slug == "our-fleet" else f"{BASE}/our-fleet/{slug}/"


def fetch(url: str) -> tuple[bytes, str]:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (fleet image extractor)"})
    with urlopen(request, timeout=30) as response:
        return response.read(), response.headers.get_content_type()


def largest_srcset(value: str) -> str:
    choices = []
    for item in value.split(","):
        parts = item.strip().split()
        if parts:
            size = int(re.sub(r"\D", "", parts[-1]) or 0) if len(parts) > 1 else 0
            choices.append((size, parts[0]))
    return max(choices, default=(0, ""))[1]


class ImageParser(HTMLParser):
    def __init__(self, base_url: str) -> None:
        super().__init__()
        self.base_url = base_url
        self.urls: list[str] = []

    def add(self, value: str | None) -> None:
        if value:
            self.urls.append(urljoin(self.base_url, value.strip()))

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "img":
            self.add(
                values.get("data-orig-file")
                or values.get("data-lazy-src")
                or values.get("data-src")
                or values.get("src")
            )
            self.add(largest_srcset(values.get("data-srcset") or values.get("srcset") or ""))
        elif tag == "source":
            self.add(largest_srcset(values.get("data-srcset") or values.get("srcset") or ""))
        elif tag == "a":
            href = values.get("href") or ""
            if Path(urlparse(href).path).suffix.lower() in IMAGE_EXTENSIONS:
                self.add(href)
        elif tag == "meta" and values.get("property") == "og:image":
            self.add(values.get("content"))
        for match in URL_RE.finditer(values.get("style") or ""):
            self.add(match.group(2))


def original_candidates(html: str, url: str) -> list[str]:
    parser = ImageParser(url)
    parser.feed(html)
    for match in URL_RE.finditer(html):
        parser.add(match.group(2))

    best: dict[str, tuple[int, str]] = {}
    for candidate in parser.urls:
        parsed = urlparse(candidate)
        filename = unquote(Path(parsed.path).name)
        lower = candidate.lower()
        if "/wp-content/uploads/" not in lower or any(term in lower for term in EXCLUDED):
            continue
        if Path(parsed.path).suffix.lower() not in IMAGE_EXTENSIONS:
            continue
        dimensions = re.search(r"-(\d+)x(\d+)(?=\.[^.]+$)", filename)
        score = int(dimensions.group(1)) * int(dimensions.group(2)) if dimensions else 10**12
        key = WP_SIZE_RE.sub("", filename.lower())
        if key not in best or score > best[key][0]:
            best[key] = (score, candidate)
    return [item[1] for item in best.values()]


def extension(url: str, content_type: str) -> str:
    suffix = Path(urlparse(url).path).suffix.lower()
    if suffix in IMAGE_EXTENSIONS:
        return ".jpg" if suffix == ".jpeg" else suffix
    return {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}.get(
        content_type, ".img"
    )


def extract(slug: str) -> int:
    url = page_url(slug)
    html_bytes, _ = fetch(url)
    candidates = original_candidates(html_bytes.decode("utf-8", errors="ignore"), url)
    folder = OUTPUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    hashes: set[str] = set()
    saved = 0
    for source in candidates:
        try:
            data, content_type = fetch(source)
        except Exception as error:
            print(f"  skipped {source}: {error}")
            continue
        if not content_type.startswith("image/"):
            continue
        digest = hashlib.sha256(data).hexdigest()
        if digest in hashes:
            continue
        hashes.add(digest)
        saved += 1
        target = folder / f"{slug}-{saved:02d}{extension(source, content_type)}"
        target.write_bytes(data)
    print(f"{slug}: {saved} images")
    return saved


def main() -> None:
    assert page_url("citation-m2").endswith("/our-fleet/citation-m2/")
    assert WP_SIZE_RE.sub("", "jet-1200x800.jpg") == "jet.jpg"
    total = sum(extract(slug) for slug in SLUGS)
    print(f"Downloaded {total} images into {OUTPUT}")


if __name__ == "__main__":
    main()
