import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Given the global stylesheet', () => {
  describe('When I check for design token usage', () => {
    it('Then I should not have hardcoded pixel values', async () => {
      const content = await readFile(join(__dirname, '../../../src/styles/global.css'), 'utf-8');
      const hardcodedSizePattern = /(margin|padding|font-size|gap):\s*\d+\.?\d*(px|rem|em)/g;
      const matches = content.match(hardcodedSizePattern) || [];
      const violations = matches.filter(m => !m.includes('/*'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('When I check for CSS custom properties', () => {
    it('Then I should find theme variables (colors, spacing, etc.)', async () => {
      const content = await readFile(join(__dirname, '../../../src/styles/global.css'), 'utf-8');
      // Should define or use var(--something)
      expect(content).toMatch(/var\(--/);
    });
  });
});
