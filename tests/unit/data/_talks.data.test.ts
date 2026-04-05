import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the talks data file', () => {
  const filePath = join(__dirname, '../../../src/data/talks.json');

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

    it('Then I should have a non-empty array of talks', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('Then each talk should have required fields (title, event)', () => {
      data.forEach(talk => {
        expect(talk).toHaveProperty('title');
        expect(talk).toHaveProperty('event');
        expect(typeof talk.title).toBe('string');
        expect(typeof talk.event).toBe('string');
      });
    });

    it('Then year should be optional', () => {
      const withYear = data.find(t => t.year !== undefined);
      const withoutYear = data.find(t => t.year === undefined);
      expect(withYear || withoutYear).toBeDefined();
    });

    it('Then I should have at least 5 talks', () => {
      expect(data.length).toBeGreaterThanOrEqual(5);
    });

    it('Then I should find known talk titles', () => {
      const titles = data.map(t => t.title);
      expect(titles.some(t => t.includes('Plataformização'))).toBe(true);
    });
  });
});
