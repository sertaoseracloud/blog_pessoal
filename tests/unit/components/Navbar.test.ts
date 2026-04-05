import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: Navbar.astro', () => {
  it('defines Props interface with optional currentPage', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
    expect(content).toContain('interface Props');
    expect(content).toContain('currentPage?:');
  });

  it('defaults currentPage to home', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
    expect(content).toContain("currentPage = 'home'");
  });

  it('defines navLinks array with 4 items', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
    expect(content).toContain('navLinks');
    expect(content).toContain('href:');
    expect(content).toContain('Sobre');
    expect(content).toContain('Portfólio');
    expect(content).toContain('Palestras');
    expect(content).toContain('Blog');
  });

  it('applies active class conditionally', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
    expect(content).toContain('class:list');
    expect(content).toContain('active: currentPage === link.page');
  });

  it('renders logo link', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
    expect(content).toContain('nav-logo');
    expect(content).toContain('Cláudio Raposo');
  });

  it('has sticky navbar styling', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/Navbar.astro'), 'utf-8');
    expect(content).toContain('.navbar');
    expect(content).toContain('position: sticky');
  });
});
