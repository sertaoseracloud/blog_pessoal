import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: BlogCard.astro', () => {
  it('defines Post interface with required fields', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain('interface Post');
    expect(content).toContain('title:');
    expect(content).toContain('date:');
    expect(content).toContain('slug:');
  });

  it('defines optional description and tags', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain('description?:');
    expect(content).toContain('tags?:');
  });

  it('defines Props interface with posts array', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain('interface Props');
    expect(content).toContain('posts: Post[]');
  });

  it('maps posts to cards with all fields', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain('posts.map(');
    expect(content).toContain('post.title');
    expect(content).toContain('post.date');
    expect(content).toContain('post.description');
    expect(content).toContain('post.tags');
    expect(content).toContain('post.slug');
  });

  it('formats date using pt-BR locale', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain("toLocaleDateString('pt-BR'");
  });

  it('uses blog-grid container class', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain('.blog-grid');
  });

  it('includes styles for all elements', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/BlogCard.astro'), 'utf-8');
    expect(content).toContain('.blog-card');
    expect(content).toContain('.blog-date');
    expect(content).toContain('.blog-desc');
    expect(content).toContain('.blog-tags');
  });
});
