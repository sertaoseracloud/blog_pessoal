import { describe, test, expect } from 'vitest';
import { readFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the BaseLayout component with real page usage', () => {
  let layoutContent: string;
  let pageFiles: string[];

  beforeAll(async () => {
    layoutContent = await readFile(
      join(__dirname, '../../../src/layouts/BaseLayout.astro'),
      'utf-8'
    );
    pageFiles = await readdir(join(__dirname, '../../../src/pages'));
  });

  describe('When BaseLayout is imported by pages', () => {
    test('Then all pages should import BaseLayout', async () => {
      // All .astro pages should import BaseLayout
      const pagesDir = join(__dirname, '../../../src/pages');
      const files = await readdir(pagesDir);

      for (const file of files) {
        if (file.endsWith('.astro')) {
          const content = await readFile(join(pagesDir, file), 'utf-8');
          expect(content).toContain('import BaseLayout');
        }
      }
    });

    test('Then BaseLayout should accept title and currentPage props', async () => {
      expect(layoutContent).toContain('interface Props');
      expect(layoutContent).toContain('title: string');
      expect(layoutContent).toContain('currentPage?: string');
    });

    test('Then BaseLayout should destructure props from Astro.props', async () => {
      expect(layoutContent).toContain('const { title, currentPage } = Astro.props');
    });
  });

  describe('When BaseLayout renders', () => {
    test('Then it should render children through <slot />', async () => {
      expect(layoutContent).toContain('<slot');
    });

    test('Then it should import global styles', async () => {
      expect(layoutContent).toContain("import '../styles/global.css'");
    });

    test('Then it should use proper language attribute', async () => {
      expect(layoutContent).toContain('lang="pt-BR"');
      expect(layoutContent).toContain('charset="UTF-8"');
    });

    test('Then it should include viewport meta tag', async () => {
      expect(layoutContent).toContain('name="viewport"');
    });

    test('Then it should include description meta tag', async () => {
      expect(layoutContent).toContain('name="description"');
    });
  });

  describe('When BaseLayout is used by portfolio page', () => {
    test('Then it should pass currentPage="portfolio"', async () => {
      const portfolioContent = await readFile(
        join(__dirname, '../../../src/pages/portfolio.astro'),
        'utf-8'
      );
      expect(portfolioContent).toContain('currentPage="portfolio"');
    });
  });

  describe('When BaseLayout is used by other pages', () => {
    test('Then each page should set correct currentPage prop', async () => {
      const pages = ['blog/index.astro', 'talks.astro', 'index.astro'];
      const expected = {
        'blog/index.astro': 'blog',
        'talks.astro': 'talks',
        'index.astro': 'home',
      };

      for (const page of pages) {
        const content = await readFile(
          join(__dirname, '../../../src/pages', page),
          'utf-8'
        );
        if (expected[page] !== undefined) {
          expect(content).toContain(`currentPage="${expected[page]}"`);
        }
      }
    });
  });
});
