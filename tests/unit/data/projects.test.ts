import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the projects data file', () => {
  const filePath = join(__dirname, '../../../src/data/projects.json');

  describe('When I check its existence', () => {
    it('Then I should find the file on disk', () => {
      expect(existsSync(filePath)).toBe(true);
    });
  });

  describe('When I parse its contents', () => {
    let data: any[];

    beforeAll(async () => {
      const content = await readFile(filePath, 'utf-8');
      data = JSON.parse(content);
    });

    it('Then I should have a non-empty array of projects', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('Then each project should have required fields with correct types', () => {
      data.forEach(project => {
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('period');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('tags');
        expect(typeof project.title).toBe('string');
        expect(typeof project.period).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(Array.isArray(project.tags)).toBe(true);
      });
    });

    it('Then each project should have at least one tag', () => {
      data.forEach(project => {
        expect(project.tags.length).toBeGreaterThan(0);
      });
    });
  });
});
