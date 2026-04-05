import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.NODE_ENV === 'production'
    ? 'https://claudioraposo.github.io'
    : 'http://localhost:4321',
  base: process.env.NODE_ENV === 'production' ? '/blog_pessoal' : '',
});