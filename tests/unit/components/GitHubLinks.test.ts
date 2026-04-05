import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/GitHubLinks.astro'), 'utf-8');
}

describe('Given the GitHubLinks component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Repo interface with required fields', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Repo');
      expect(content).toContain('name: string');
      expect(content).toContain('description: string');
      expect(content).toContain('url: string');
      expect(content).toContain('language: string');
    });
  });

  describe('When I check how repos are loaded', () => {
    it('Then I should use loadData utility', async () => {
      const content = await readComponent();
      expect(content).toContain('loadData');
      expect(content).toContain('repos.json');
    });

    it('Then I should use validateRepo validator', async () => {
      const content = await readComponent();
      expect(content).toContain('validateRepo');
    });

    it('Then I should await loadData with validation', async () => {
      const content = await readComponent();
      expect(content).toContain('const repos: Repo[] = await loadData(');
    });
  });

  describe('When I check how repos are rendered', () => {
    it('Then I should map each repo to a card', async () => {
      const content = await readComponent();
      expect(content).toContain('repos.map(');
      expect(content).toContain('repo.name');
      expect(content).toContain('repo.description');
      expect(content).toContain('repo.language');
    });

    it('Then I should render external links with security attributes', async () => {
      const content = await readComponent();
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener"');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find repos-grid layout with CSS Grid', async () => {
      const content = await readComponent();
      expect(content).toContain('.repos-grid');
      expect(content).toContain('display: grid');
    });

    it('Then I should find repo-card styles', async () => {
      const content = await readComponent();
      expect(content).toContain('.repo-card');
    });
  });
});
