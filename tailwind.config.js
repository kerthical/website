import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [typography, daisyui],
  daisyui: {
    logs: false,
    darkTheme: 'black',
    themes: ['winter', 'black', 'cmyk'],
  },
};
