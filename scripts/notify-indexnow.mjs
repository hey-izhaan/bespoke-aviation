const { SITE_URL, BASE_PATH = "/", INDEXNOW_KEY } = process.env;

if (!SITE_URL || !INDEXNOW_KEY) {
  throw new Error("SITE_URL and INDEXNOW_KEY are required");
}

const trimmedBase = BASE_PATH.replace(/^\/+|\/+$/g, "");
const base = trimmedBase ? `/${trimmedBase}/` : "/";
const root = new URL(base, `${SITE_URL.replace(/\/$/, "")}/`);
const paths = [
  "",
  "available-aircraft",
  "contact-us",
  "terms",
];

const payload = {
  host: root.host,
  key: INDEXNOW_KEY,
  keyLocation: new URL(`${INDEXNOW_KEY}.txt`, root).href,
  urlList: paths.map((path) => new URL(path, root).href),
};

if (process.env.INDEXNOW_DRY_RUN === "true") {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
});

if (!response.ok && response.status !== 202) {
  throw new Error(
    `IndexNow returned ${response.status}: ${await response.text()}`,
  );
}

console.log(`IndexNow accepted ${payload.urlList.length} URLs`);
