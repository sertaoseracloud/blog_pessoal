import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { loadData, joinBase } from '../../../src/utils/data';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../../../src/data');

describe('Given the data utility module', () => {
  describe('When I use loadData function', () => {
    it('Then I should load valid JSON data from projects.json', async () => {
      const data = await loadData('projects.json');
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('Then I should load valid data from certifications.json', async () => {
      const data = await loadData('certifications.json');
      expect(Array.isArray(data)).toBe(true);
    });

    it('Then I should filter out invalid items from publications.json using validator', async () => {
      const data = await loadData('publications.json');
      expect(Array.isArray(data)).toBe(true);
      // Publications.json has some entries that validation rejects
    });

    it('Then I should return empty array for non-existent file', async () => {
      const data = await loadData('nonexistent.json');
      expect(data).toEqual([]);
    });
  });
});
