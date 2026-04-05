import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '../../../src/data/repos.json');

async function loadRepos() {
  const content = await readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

describe('Given the repositories data file', () => {
  describe('When I check its existence', () => {
    it('Then I should find the file on disk', () => {
      expect(existsSync(filePath)).toBe(true);
    });
  });

  describe('When I parse its contents', () => {
    let data: any[];

    beforeAll(async () => {
      data = await loadRepos();
    });

    it('Then I should have a non-empty array of repos', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('Then each repo should have required fields', () => {
      data.forEach(repo => {
        expect(repo).toHaveProperty('name');
        expect(repo).toHaveProperty('description');
        expect(repo).toHaveProperty('url');
        expect(repo).toHaveProperty('language');
        expect(typeof repo.name).toBe('string');
        expect(typeof repo.description).toBe('string');
        expect(typeof repo.url).toBe('string');
      });
    });

    it('Then I should find known repos', () => {
      const names = data.map(r => r.name);
      const knownRepos = ['nestjs-viacep', 'nestjs-dataprotection', 'nestjs-chatgpt', 'linkshare'];
      knownRepos.forEach(name => {
        expect(names.includes(name)).toBe(true);
      });
    });
  });
});
