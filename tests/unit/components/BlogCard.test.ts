import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
}

describe('Given the BlogCard component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Post interface with required fields', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Post');
      expect(content).toContain('title: string');
      expect(content).toContain('date: Date');
      expect(content).toContain('slug: string');
    });

    it('Then I should find optional description and tags', async () => {
      const content = await readComponent();
      expect(content).toContain('description?: string');
      expect(content).toContain('tags?: string[]');
    });

    it('Then I should find a Props interface with posts array', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('posts: Post[]');
    });
  });

  describe('When I check data import', () => {
    it('Then I should find joinBase from constants', async () => {
      const content = await readComponent();
      expect(content).toContain("import { joinBase } from '../constants'");
    });
  });

  describe('When I check how posts are rendered', () => {
    it('Then I should map each post to a card', async () => {
      const content = await readComponent();
      expect(content).toContain('posts.map(');
      expect(content).toContain('post.title');
      expect(content).toContain('post.date');
      expect(content).toContain('post.description');
      expect(content).toContain('post.tags');
      expect(content).toContain('post.slug');
    });

    it('Then I should use joinBase for post links', async () => {
      const content = await readComponent();
      expect(content).toContain("joinBase('blog', post.slug)");
    });

    it('Then I should format the date in pt-BR locale', async () => {
      const content = await readComponent();
      expect(content).toContain("toLocaleDateString('pt-BR'");
      expect(content).toContain('year: \'numeric\'');
      expect(content).toContain('month: \'long\'');
      expect(content).toContain('day: \'numeric\'');
    });

    it('Then I should conditionally render description and tags', async () => {
      const content = await readComponent();
      expect(content).toContain('post.description &&');
      expect(content).toContain('post.tags &&');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find blog-grid container with grid', async () => {
      const content = await readComponent();
      expect(content).toContain('.blog-grid');
      expect(content).toContain('display: grid');
    });

    it('Then I should find blog-card styling', async () => {
      const content = await readComponent();
      expect(content).toContain('.blog-card');
    });

    it('Then I should find blog-date, blog-desc, and blog-tags styles', async () => {
      const content = await readComponent();
      expect(content).toContain('.blog-date');
      expect(content).toContain('.blog-desc');
      expect(content).toContain('.blog-tags');
    });
  });
});
