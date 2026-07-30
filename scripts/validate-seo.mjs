import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const site = process.env.SITE_URL ?? "https://www.bespoke-aviation.com";
const rawBase = process.env.BASE_PATH ?? "/";
const trimmedBase = rawBase.replace(/^\/+|\/+$/g, "");
const base = trimmedBase ? `/${trimmedBase}/` : "/";
const root = new URL(base, `${site.replace(/\/$/, "")}/`);
const dist = join(process.cwd(), "dist");

const publicPages = {
  "index.html": new URL("", root).href,
  "available-aircraft/index.html": new URL("available-aircraft", root).href,
  "contact-us/index.html": new URL("contact-us", root).href,
  "terms/index.html": new URL("terms", root).href,
};

const read = (file) => readFileSync(join(dist, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const titles = new Set();
const descriptions = new Set();

for (const [file, expectedCanonical] of Object.entries(publicPages)) {
  const html = read(file);
  const canonicalTags = [
    ...html.matchAll(/<link rel="canonical" href="([^"]+)"/gi),
  ];
  const titleTags = [...html.matchAll(/<title>(.*?)<\/title>/gi)];
  const descriptionTags = [
    ...html.matchAll(/<meta name="description" content="([^"]+)"/gi),
  ];
  const jsonLdBlocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    ),
  ];
  const internalRouteLinks = [
    ...html.matchAll(/href="(\/[^"#?]*)"/gi),
  ]
    .map(([, href]) => href)
    .filter((href) => !href.includes("."));

  assert(
    [...html.matchAll(/data-barba="wrapper"/gi)].length === 1,
    `${file}: expected one Barba wrapper`,
  );
  assert(
    [...html.matchAll(/data-barba="container"/gi)].length === 1,
    `${file}: expected one Barba container`,
  );
  assert(canonicalTags.length === 1, `${file}: expected one canonical tag`);
  assert(
    canonicalTags[0][1] === expectedCanonical,
    `${file}: incorrect canonical URL`,
  );
  assert(
    file === "index.html" || !canonicalTags[0][1].endsWith("/"),
    `${file}: canonical URL must not have a trailing slash`,
  );
  for (const href of internalRouteLinks) {
    assert(
      href === base || !href.endsWith("/"),
      `${file}: internal route URL must not have a trailing slash: ${href}`,
    );
  }
  assert(titleTags.length === 1, `${file}: expected one title tag`);
  assert(
    descriptionTags.length === 1,
    `${file}: expected one meta description`,
  );
  assert(
    [...html.matchAll(/<h1(?:\s|>)/gi)].length === 1,
    `${file}: expected one H1`,
  );
  assert(
    html.includes(`property="og:url" content="${expectedCanonical}"`),
    `${file}: Open Graph URL does not match its canonical`,
  );
  assert(
    html.includes('name="twitter:card" content="summary_large_image"'),
    `${file}: Twitter card metadata is missing`,
  );
  assert(
    html.includes('rel="icon" type="image/svg+xml"'),
    `${file}: SVG favicon is missing`,
  );
  assert(
    html.includes(
      'name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"',
    ),
    `${file}: index directives are missing`,
  );
  if (process.env.PUBLIC_GOOGLE_SITE_VERIFICATION) {
    assert(
      html.includes(
        `name="google-site-verification" content="${process.env.PUBLIC_GOOGLE_SITE_VERIFICATION}"`,
      ),
      `${file}: Google verification token is missing`,
    );
  }
  if (process.env.PUBLIC_BING_SITE_VERIFICATION) {
    assert(
      html.includes(
        `name="msvalidate.01" content="${process.env.PUBLIC_BING_SITE_VERIFICATION}"`,
      ),
      `${file}: Bing verification token is missing`,
    );
  }
  assert(jsonLdBlocks.length === 1, `${file}: expected one JSON-LD block`);

  const graph = JSON.parse(jsonLdBlocks[0][1])["@graph"];
  const types = graph.map((item) => item["@type"]);

  for (const type of ["Organization", "Person", "WebSite", "Service"]) {
    assert(types.includes(type), `${file}: ${type} schema is missing`);
  }

  titles.add(titleTags[0][1]);
  descriptions.add(descriptionTags[0][1]);
}

assert(
  titles.size === Object.keys(publicPages).length,
  "Public page titles are not unique",
);
assert(
  descriptions.size === Object.keys(publicPages).length,
  "Public page descriptions are not unique",
);

const notFound = read("404.html");
assert(
  notFound.includes('name="robots" content="noindex, follow"'),
  "404.html: noindex directive is missing",
);
assert(
  !notFound.includes('type="application/ld+json"'),
  "404.html: should not emit structured data",
);

const sitemap = read("sitemap-0.xml");
assert(!sitemap.includes("404"), "The 404 page leaked into the sitemap");
assert(
  [
    `<loc>${root.href}</loc>`,
    `<loc>${root.href.replace(/\/$/, "")}</loc>`,
  ].some((candidate) => sitemap.includes(candidate)),
  "The sitemap root URL is incorrect",
);

for (const canonical of Object.values(publicPages).slice(1)) {
  assert(
    sitemap.includes(`<loc>${canonical}</loc>`),
    `The sitemap is missing ${canonical}`,
  );
}

const robots = read("robots.txt");
assert(
  robots.includes(`Sitemap: ${new URL("sitemap-index.xml", root).href}`),
  "robots.txt references the wrong sitemap",
);

const manifest = JSON.parse(read("manifest.webmanifest"));
assert(manifest.start_url === root.href, "The manifest start URL is incorrect");
assert(
  manifest.icons.some((icon) => icon.sizes === "192x192"),
  "The manifest 192x192 icon is missing",
);
assert(
  manifest.icons.some((icon) => icon.sizes === "512x512"),
  "The manifest 512x512 icon is missing",
);

const llms = read("llms.txt");
assert(
  llms.includes(new URL("contact-us", root).href),
  "llms.txt contains incorrect page URLs",
);

for (const requiredFile of [
  "robots.txt",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "llms.txt",
  "manifest.webmanifest",
  "404.html",
  "favicon.ico",
  "Favicons/Favicon.svg",
  "Favicons/favicon-16x16.png",
  "Favicons/favicon-32x32.png",
  "Favicons/apple-touch-icon.png",
  "Favicons/android-chrome-192x192.png",
  "Favicons/android-chrome-512x512.png",
]) {
  assert(existsSync(join(dist, requiredFile)), `${requiredFile} was not built`);
}

console.log(`SEO artifact validation passed for ${root.href}`);
