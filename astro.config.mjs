import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';

// Static output: the landing page is prerendered at build time.
// Only the contact API (`export const prerender = false`) runs on the Node server.
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  server: { host: true },
  // Secrets are read from the server environment at runtime, never inlined into the build.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
        default: 'DeveLogic <onboarding@resend.dev>',
      }),
    },
  },
});
