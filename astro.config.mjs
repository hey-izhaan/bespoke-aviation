import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL ?? "https://www.bespoke-aviation.com";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  publicDir: "./Public",
  integrations: [
    sitemap({
      filter: (page) => !/\/404(?:\.html)?\/?$/.test(page),
    }),
  ],
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
});
