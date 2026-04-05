import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: GitHubLinks.astro', () => {
  it('defines Repo interface with required fields', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GitHubLinks.astro'), 'utf-8');
    expect(content).toContain('name:');
    expect(content).toContain('description:');
    expect(content).toContain('url:');
    expect(content).toContain('language:');
  });

  it('loads repos from JSON data file', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GitHubLinks.astro'), 'utf-8');
    expect(content).toContain('loadData');
    expect(content).toContain('repos.json');
  });

  it('maps repos to repo cards', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GitHubLinks.astro'), 'utf-8');
    expect(content).toContain('repos.map(');
    expect(content).toContain('repo.name');
    expect(content).toContain('repo.description');
    expect(content).toContain('repo.language');
  });

  it('renders external links with security attributes', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GitHubLinks.astro'), 'utf-8');
    expect(content).toContain('target="_blank"');
    expect(content).toContain('rel="noopener"');
  });

  it('has repos-grid layout', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GitHubLinks.astro'), 'utf-8');
    expect(content).toContain('.repos-grid');
  });
});
