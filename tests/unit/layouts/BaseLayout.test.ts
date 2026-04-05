import { existsSync, readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readLayout() {
  return readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
}

describe('Given the BaseLayout source', () => {
  describe('When I check its structure', () => {
    it('Then I should find the file exists', () => {
      const filePath = join(__dirname, '../../../src/layouts/BaseLayout.astro');
      expect(existsSync(filePath)).toBe(true);
    });

    it('Then I should import the Navbar component', async () => {
      const content = await readLayout();
      expect(content).toContain("import Navbar from '../components/Navbar.astro'");
    });

    it('Then I should import global styles', async () => {
      const content = await readLayout();
      expect(content).toContain("import '../styles/global.css'");
    });
  });

  describe('When I check its HTML structure', () => {
    it('Then I should have html lang="pt-BR"', async () => {
      const content = await readLayout();
      expect(content).toContain('lang="pt-BR"');
    });

    it('Then I should set charset to UTF-8', async () => {
      const content = await readLayout();
      expect(content).toContain('charset="UTF-8"');
    });

    it('Then I should have viewport meta', async () => {
      const content = await readLayout();
      expect(content).toContain('name="viewport"');
    });
  });

  describe('When I check SEO elements', () => {
    it('Then I should have a description meta tag with default value', async () => {
      const content = await readLayout();
      expect(content).toContain('name="description"');
    });

    it('Then I should render dynamic title prop', async () => {
      const content = await readLayout();
      expect(content).toContain('<title>{title}</title>');
    });
  });

  describe('When I check the page layout', () => {
    it('Then I should render Navbar with currentPage prop', async () => {
      const content = await readLayout();
      expect(content).toContain('<Navbar currentPage');
    });

    it('Then I should have a slot for page content', async () => {
      const content = await readLayout();
      expect(content).toContain('<slot');
    });

    it('Then I should render a footer with dynamic copyright year', async () => {
      const content = await readLayout();
      expect(content).toContain('footer');
      expect(content).toContain('getFullYear()');
    });
  });
});
