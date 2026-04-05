import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: ProjectTimeline.astro', () => {
  it('defines Project interface with required fields', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/ProjectTimeline.astro'), 'utf-8');
    expect(content).toContain('title:');
    expect(content).toContain('period:');
    expect(content).toContain('description:');
    expect(content).toContain('tags:');
  });

  it('renders projects as timeline items', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/ProjectTimeline.astro'), 'utf-8');
    expect(content).toContain('projects.map(');
    expect(content).toContain('.timeline-item');
  });

  it('displays period, title, description, and tags', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/ProjectTimeline.astro'), 'utf-8');
    expect(content).toContain('{project.period}');
    expect(content).toContain('{project.title}');
    expect(content).toContain('{project.description}');
    expect(content).toContain('project.tags.map');
  });

  it('has timeline marker elements', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/ProjectTimeline.astro'), 'utf-8');
    expect(content).toContain('timeline');
    expect(content).toContain('timeline-marker');
    expect(content).toContain('timeline-content');
    expect(content).toContain('timeline-item');
    expect(content).toContain('timeline-period');
    expect(content).toContain('timeline-title');
    expect(content).toContain('timeline-desc');
    expect(content).toContain('timeline-tags');
  });

  it('has vertical line connector', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/ProjectTimeline.astro'), 'utf-8');
    expect(content).toContain('.timeline::before');
  });
});
