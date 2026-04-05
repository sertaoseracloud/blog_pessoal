import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: GenericCard.astro', () => {
  it('should define Props interface with required fields', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('interface Props');
    expect(content).toContain('title:');
  });

  it('should accept optional description and period', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('description?:');
    expect(content).toContain('period?:');
  });

  it('should accept optional tags prop', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('tags?:');
  });

  it('should accept optional link and linkLabel', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('link?:');
    expect(content).toContain('linkLabel?:');
  });

  it('should render title', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('{title}');
  });

  it('should render period when provided', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('{period}');
  });

  it('should render description when provided', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('{description}');
  });

  it('should render tags as map', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('tags.map');
    expect(content).toContain('{tag}');
  });

  it('should render link when provided', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('{link}');
    expect(content).toContain('{linkLabel}');
  });

  it('should use card class', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/GenericCard.astro'), 'utf-8');
    expect(content).toContain('class=');
    expect(content).toContain('card');
  });
});
