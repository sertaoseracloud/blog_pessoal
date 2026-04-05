import { describe, test, expect } from 'vitest';
import { BASE_URL, joinBase } from '../../../src/constants';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the routing integration with BASE_URL', () => {
  describe('When BASE_URL is configured', () => {
    test('Then it should have a defined value', async () => {
      expect(BASE_URL).toBeDefined();
    });

    test('Then it should start with /', async () => {
      expect(BASE_URL.startsWith('/')).toBe(true);
    });
  });

  describe('When joinBase is called with subdirectory paths', () => {
    test('Then it should produce correct URLs for simple paths', async () => {
      const portfolio = joinBase('portfolio');
      expect(portfolio).toContain('/portfolio');
    });

    test('Then it should handle nested paths correctly', async () => {
      const blogPost = joinBase('blog', 'hello-world');
      expect(blogPost).toMatch(/\/blog\/hello-world$/);
    });

    test('Then it should handle path segments with leading/trailing slashes', async () => {
      const result = joinBase('/portfolio/', '/about/');
      expect(result).toMatch(/\/portfolio\/about$/);
    });

    test('Then it should handle empty segments gracefully', async () => {
      const result = joinBase('');
      expect(result).toBeTruthy();
    });
  });

  describe('When components use joinBase for internal links', () => {
    test('Then Navbar should use joinBase for all navigation links', async () => {
      const content = await readFile(
        join(__dirname, '../../../src/components/Navbar.astro'),
        'utf-8'
      );
      expect(content).toContain('joinBase');
      expect(content).toContain("href={joinBase");
    });

    test('Then BlogCard should use joinBase for article links', async () => {
      const content = await readFile(
        join(__dirname, '../../../src/components/BlogCard.astro'),
        'utf-8'
      );
      expect(content).toContain('joinBase');
    });

    test('Then Blog post page should use joinBase for back links', async () => {
      const content = await readFile(
        join(__dirname, '../../../src/pages/blog/[...slug].astro'),
        'utf-8'
      );
      expect(content).toContain('joinBase');
    });
  });

  describe('When internal links are generated with joinBase', () => {
    test('Then no hardcoded absolute paths should exist in Navbar', async () => {
      const content = await readFile(
        join(__dirname, '../../../src/components/Navbar.astro'),
        'utf-8'
      );
      const hardcodedPaths = content.match(/href="\/[a-z-]+"/g);
      const withoutJoinBase = hardcodedPaths?.filter(
        m => !content.includes(`joinBase(${m.replace(/href="/, '').replace(/"/, '')})`)
      );
      expect(withoutJoinBase || []).toHaveLength(0);
    });
  });
});
