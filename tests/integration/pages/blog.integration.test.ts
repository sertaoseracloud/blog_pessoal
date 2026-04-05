import { describe, test, expect } from 'vitest';
import { readPageScript, readFullPageContent } from '../../test-utils';

describe('Given the blog index page', () => {
  describe('When the blog page script is analyzed', () => {
    test('Then it should import necessary components and layouts', async () => {
      const script = await readPageScript('src/pages/blog/index.astro');
      expect(script).toContain("import BaseLayout");
      expect(script).toContain("import BlogCard");
    });

    test('Then it should set proper metadata', async () => {
      const content = await readFullPageContent('src/pages/blog/index.astro');
      expect(content).toContain("<BaseLayout title=\"Blog — Cláudio Raposo\"");
      expect(content).toContain('currentPage="blog"');
    });

    test('Then it should have section for blog posts', async () => {
      const content = await readFullPageContent('src/pages/blog/index.astro');
      expect(content).toContain('<section class="container section">');
    });
  });

  describe('When BlogCard components are rendered', () => {
    test('Then each card should map to a blog post', async () => {
      const content = await readFullPageContent('src/pages/blog/index.astro');
      expect(content).toContain('map(');
      expect(content).toContain('<BlogCard');
    });
  });
});
