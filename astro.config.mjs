import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import critters from 'astro-critters';
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  site: 'https://kerthical.com',
  output: 'server',
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
  integrations: [tailwind(), critters(), compress()],
});
