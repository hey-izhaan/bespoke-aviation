import { defineConfig } from "astro/config";

export default defineConfig({
  build: {
    format: "file",
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
});
