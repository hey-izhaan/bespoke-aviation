import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const url = (path = "") => new URL(`${base}${path}`, site).href;

  const body = `# Bespoke Aviation

> Independent private aircraft charter brokerage, personally managed by founder Mark Rowlands.

Bespoke Aviation Limited sources and compares suitable aircraft worldwide for business and leisure journeys. Mark Rowlands personally manages each charter from the first enquiry through safe arrival.

## Primary pages

- [Home](${url()})
- [Available aircraft](${url("available-aircraft")})
- [Request a quote](${url("contact-us")})
- [Privacy policy and charter terms](${url("terms")})

## Services and credentials

- Private aircraft charter sourcing and brokerage
- Worldwide access to independently sourced aircraft
- Journey planning and personal management
- Accredited member of The Air Charter Association

## Direct contact

- Mark Rowlands, Founder
- Email: mark@bespoke-aviation.com
- Telephone: +44 (0)7797 923 575
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
