import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Static output: the landing page is prerendered at build time.
// Only the contact API (`export const prerender = false`) runs on the Node server.
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  server: { host: true },
});
