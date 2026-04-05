import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Data: projects.json', () => {
  it('should exist', () => {
    const filePath = join(__dirname, '../../../src/data/projects.json');
    expect(existsSync(filePath)).toBe(true);
  });

  it('should have valid JSON structure', async () => {
    const filePath = join(__dirname, '../../../src/data/projects.json');
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
