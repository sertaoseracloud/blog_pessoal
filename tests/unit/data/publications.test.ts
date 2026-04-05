import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Data: publications.json', () => {
  it('should exist and have valid structure', async () => {
    const filePath = join(__dirname, '../../../src/data/publications.json');
    expect(existsSync(filePath)).toBe(true);
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    expect(Array.isArray(data)).toBe(true);
    data.forEach(pub => {
      expect(pub).toHaveProperty('title');
      expect(pub).toHaveProperty('venue');
      expect(pub).toHaveProperty('year');
    });
  });
});
