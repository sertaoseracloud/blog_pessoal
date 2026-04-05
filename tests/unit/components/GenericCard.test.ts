import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
}

describe('Given the GenericCard component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Props interface with required title', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('title: string');
    });

    it('Then I should find optional description and period', async () => {
      const content = await readComponent();
      expect(content).toContain('description?: string');
      expect(content).toContain('period?: string');
    });

    it('Then I should find optional tags prop', async () => {
      const content = await readComponent();
      expect(content).toContain('tags?: string[]');
    });

    it('Then I should find optional link and linkLabel', async () => {
      const content = await readComponent();
      expect(content).toContain('link?: string');
      expect(content).toContain('linkLabel?: string');
    });

    it('Then I should find a class prop for external classes', async () => {
      const content = await readComponent();
      expect(content).toContain('class?: string');
    });
  });

  describe('When I check how data is destructured from props', () => {
    it('Then I should use Astro.props with defaults', async () => {
      const content = await readComponent();
      expect(content).toContain('Astro.props');
      expect(content).toContain("tags = []");
      expect(content).toContain("linkLabel = 'Saiba mais'");
    });

    it('Then I should destructure title, description, period, link, and className', async () => {
      const content = await readComponent();
      expect(content).toContain('{ title, description, period, tags = [], link, linkLabel = \'Saiba mais\', class: className }');
    });
  });

  describe('When I check how the card renders', () => {
    it('Then I should always render the title', async () => {
      const content = await readComponent();
      expect(content).toContain('{title}');
    });

    it('Then I should conditionally render the period', async () => {
      const content = await readComponent();
      expect(content).toContain('period &&');
    });

    it('Then I should conditionally render the description', async () => {
      const content = await readComponent();
      expect(content).toContain('description && ');
    });

    it('Then I should render tags when the array is not empty', async () => {
      const content = await readComponent();
      expect(content).toContain('tags.length > 0');
      expect(content).toContain('tags.map(tag =>');
    });

    it('Then I should render a link when link is provided with target and rel', async () => {
      const content = await readComponent();
      expect(content).toContain('link &&');
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener"');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find styled card components for title, description, period, tags, and link', async () => {
      const content = await readComponent();
      expect(content).toContain('.card-title');
      expect(content).toContain('.card-description');
      expect(content).toContain('.card-period');
      expect(content).toContain('.card-tags');
      expect(content).toContain('.card-link');
    });
  });
});
