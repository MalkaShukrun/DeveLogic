import type { APIRoute } from 'astro';

// Generated at build time from the page files in src/pages, so new public pages are
// picked up automatically. Only `.astro` pages are considered: API endpoints are never listed.
export const prerender = true;

// Public pages that must stay out of the sitemap (noindex, private, test pages, etc.).
// Use the route path, e.g. '/thank-you'.
const EXCLUDE = new Set<string>([]);

// Path segments that are never public (admin, login, test pages...).
const PRIVATE_SEGMENT = /^(admin|api|login|register|account|test|dev)$/i;

const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));

function toRoute(file: string): string | null {
  const path = file.replace(/^\.\//, '').replace(/\.astro$/, '');
  const segments = path.split('/');
  // Skip dynamic routes ([slug]), private/underscored files and error pages.
  if (segments.some((s) => s.startsWith('_') || s.includes('[') || PRIVATE_SEGMENT.test(s))) return null;
  if (/^(404|500)$/.test(segments.at(-1)!)) return null;
  if (segments.at(-1) === 'index') segments.pop();
  return '/' + segments.join('/');
}

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs to generate the sitemap.');

  const routes = [...new Set(pageFiles.map(toRoute).filter((r): r is string => r !== null))]
    .filter((r) => !EXCLUDE.has(r))
    .sort((a, b) => a.length - b.length || a.localeCompare(b));

  const urls = routes.map((route) => `  <url>\n    <loc>${new URL(route, site).href}</loc>\n  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
