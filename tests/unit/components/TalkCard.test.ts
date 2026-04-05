import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: TalkCard.astro', () => {
  it('defines Talk interface with title and event', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
    expect(content).toContain('title:');
    expect(content).toContain('event:');
  });

  it('defines optional year and description fields', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
    expect(content).toContain('year?:');
    expect(content).toContain('description?:');
  });

  it('maps talks to cards', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
    expect(content).toContain('talks.map(');
    expect(content).toContain('{talk.title}');
    expect(content).toContain('{talk.event}');
  });

  it('shows year as badge when provided', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
    expect(content).toContain('{talk.year}');
  });

  it('renders description conditionally', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
    expect(content).toContain('{talk.description}');
  });

  it('has talks-grid layout', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/TalkCard.astro'), 'utf-8');
    expect(content).toContain('.talks-grid');
  });
});
