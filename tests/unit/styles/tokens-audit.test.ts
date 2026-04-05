import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Design Token Audit', () => {
  it('should not have hardcoded pixel values in global.css', async () => {
    const content = await readFile(join(__dirname, '../../../src/styles/global.css'), 'utf-8');
    const hardcodedSizePattern = /(margin|padding|font-size|gap):\s*\d+\.?\d*(px|rem|em)/g;
    const matches = content.match(hardcodedSizePattern) || [];
    const violations = matches.filter(m => !m.includes('/*'));
    expect(violations).toHaveLength(0);
  });
});
