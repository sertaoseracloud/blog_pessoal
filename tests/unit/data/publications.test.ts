import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the publications data file', () => {
  const filePath = join(__dirname, '../../../src/data/publications.json');

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

    it('Then I should have a non-empty array of publications', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('Then each publication should have title, venue, and year', () => {
      data.forEach(pub => {
        expect(pub).toHaveProperty('title');
        expect(pub).toHaveProperty('venue');
        expect(pub).toHaveProperty('year');
        expect(typeof pub.title).toBe('string');
        expect(typeof pub.venue).toBe('string');
        expect(typeof pub.year).toBe('string');
      });
    });

    it('Then citations field should be optional numeric', () => {
      const withCitations = data.find(p => p.citations !== undefined);
      const withoutCitations = data.find(p => p.citations === undefined);
      // Both are valid
      expect(withCitations || withoutCitations).toBeDefined();
      if (withCitations) {
        expect(typeof withCitations.citations).toBe('number');
      }
    });
  });
});
