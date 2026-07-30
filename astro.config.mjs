import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL ?? "https://hey-izhaan.github.io";
const base = process.env.BASE_PATH ?? "/bespoke-aviation";
const basePath = `/${base.replace(/^\/+|\/+$/g, "")}`;
const rootPath = basePath === "/" ? "/" : `${basePath}/`;

export default defineConfig({
  site,
  base,
  publicDir: "./Public",
  integrations: [
    sitemap({
      filter: (page) => !/\/404(?:\.html)?$/.test(page),
      serialize(item) {
        const url = new URL(item.url);

        if (url.pathname === basePath || url.pathname === `${basePath}/`) {
          url.pathname = rootPath;
        } else if (!url.pathname.endsWith(".html")) {
          url.pathname = `${url.pathname}.html`;
        }

        item.url = url.href;
        return item;
      },
    }),
  ],
  build: {
    format: "file",
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
});
