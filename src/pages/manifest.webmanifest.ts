import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const absolute = (path = "") => new URL(`${base}${path}`, site).href;

  return new Response(
    JSON.stringify({
      name: "Bespoke Aviation",
      short_name: "Bespoke Aviation",
      description: "Private aircraft charter, personally managed.",
      id: absolute(),
      start_url: absolute(),
      scope: absolute(),
      display: "standalone",
      background_color: "#f3f0e9",
      theme_color: "#121b2a",
      icons: [
        {
          src: absolute("Favicons/android-chrome-192x192.png"),
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: absolute("Favicons/android-chrome-512x512.png"),
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    }),
    {
      headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
    },
  );
};
