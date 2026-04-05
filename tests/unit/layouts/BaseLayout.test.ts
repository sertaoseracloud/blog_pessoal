import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Layout: BaseLayout.astro', () => {
  it('imports Navbar component', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain("import Navbar from '../components/Navbar.astro'");
  });

  it('sets page title from props', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain('{title}');
  });

  it('passes currentPage to Navbar', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain('currentPage={currentPage}');
  });

  it('renders slot for page content', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain('<slot />');
  });

  it('renders footer with copyright year', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain('footer');
    expect(content).toContain('getFullYear()');
  });

  it('has meta description with default', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain('meta name="description"');
  });

  it('sets lang="pt-BR"', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain('lang="pt-BR"');
  });

  it('has global styles', async () => {
    const content = await readFile(join(__dirname, '../../../src/layouts/BaseLayout.astro'), 'utf-8');
    expect(content).toContain("import '../styles/global.css'");
  });
});
