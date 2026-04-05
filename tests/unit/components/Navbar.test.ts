import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
}

describe('Given the Navbar component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Props interface with optional currentPage', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('currentPage?:');
    });

    it('Then I should default currentPage to "home"', async () => {
      const content = await readComponent();
      expect(content).toContain("currentPage = 'home'");
    });
  });

  describe('When I check navigation links', () => {
    it('Then I should define navLinks array with 4 items', async () => {
      const content = await readComponent();
      expect(content).toContain('navLinks');
      expect(content).toContain('href:');
    });

    it('Then I should have Sobre, Portfólio, Palestras, Blog links', async () => {
      const content = await readComponent();
      expect(content).toContain("label: 'Sobre'");
      expect(content).toContain("label: 'Portfólio'");
      expect(content).toContain("label: 'Palestras'");
      expect(content).toContain("label: 'Blog'");
    });

    it('Then I should use joinBase for hrefs', async () => {
      const content = await readComponent();
      expect(content).toContain('joinBase(');
    });

    it('Then I should render the logo link with joinBase', async () => {
      const content = await readComponent();
      expect(content).toContain('nav-logo');
      expect(content).toContain('joinBase()');
    });

    it('Then I should apply active class based on currentPage', async () => {
      const content = await readComponent();
      expect(content).toContain('class:list');
      expect(content).toContain('active: currentPage === link.page');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find navbar with sticky positioning', async () => {
      const content = await readComponent();
      expect(content).toContain('.navbar');
      expect(content).toContain('position: sticky');
    });

    it('Then I should find navigation links styling', async () => {
      const content = await readComponent();
      expect(content).toContain('.nav-link');
    });

    it('Then I should find mobile responsive styles', async () => {
      const content = await readComponent();
      expect(content).toContain('@media (max-width:');
    });
  });
});
