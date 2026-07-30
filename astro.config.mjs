import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hey-izhaan.github.io",
  base: "/bespoke-aviation",
  build: {
    format: "file",
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
});
