import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
}

describe('Given the TalkCard component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Talk interface with required title and event', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Talk');
      expect(content).toContain('title: string');
      expect(content).toContain('event: string');
    });

    it('Then I should find optional year and description fields', async () => {
      const content = await readComponent();
      expect(content).toContain('year?: string');
      expect(content).toContain('description?: string');
    });

    it('Then I should find a Props interface with talks array', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('talks: Talk[]');
    });
  });

  describe('When I check destructuring of props', () => {
    it('Then I should destructure talks from Astro.props', async () => {
      const content = await readComponent();
      expect(content).toContain('const { talks } = Astro.props');
    });
  });

  describe('When I check how talks are rendered', () => {
    it('Then I should map each talk to a card', async () => {
      const content = await readComponent();
      expect(content).toContain('talks.map(');
      expect(content).toContain('talk.title');
      expect(content).toContain('talk.event');
    });

    it('Then I should conditionally render year as a tag badge', async () => {
      const content = await readComponent();
      expect(content).toContain('talk.year &&');
      expect(content).toContain('class="tag"');
    });

    it('Then I should conditionally render description', async () => {
      const content = await readComponent();
      expect(content).toContain('talk.description &&');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find talks-grid layout', async () => {
      const content = await readComponent();
      expect(content).toContain('.talks-grid');
      expect(content).toContain('display: grid');
    });

    it('Then I should find talk-card, talk-event, and talk-desc styles', async () => {
      const content = await readComponent();
      expect(content).toContain('.talk-card');
      expect(content).toContain('.talk-event');
      expect(content).toContain('.talk-desc');
    });
  });
});
