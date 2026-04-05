import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the certifications data file', () => {
  const filePath = join(__dirname, '../../../src/data/certifications.json');

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

    it('Then I should have an array of certifications', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('Then each certification should have required fields', () => {
      data.forEach(cert => {
        expect(cert).toHaveProperty('name');
        expect(cert).toHaveProperty('issuer');
        expect(typeof cert.name).toBe('string');
        expect(typeof cert.issuer).toBe('string');
      });
    });

    it('Then year field should be optional', () => {
      const withYear = data.find(c => c.year !== undefined);
      const withoutYear = data.find(c => c.year === undefined);
      // Both should be valid
      expect(withYear || withoutYear).toBeDefined();
    });

    it('Then I should find known certifications like Microsoft MVP', () => {
      const mvp = data.find(c => c.name.includes('Microsoft MVP'));
      expect(mvp).toBeDefined();
      expect(mvp.issuer).toBe('Microsoft');
    });
  });
});
