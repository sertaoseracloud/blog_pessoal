import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/ProjectTimeline.astro'), 'utf-8');
}

describe('Given the ProjectTimeline component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Project interface with required fields', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Project');
      expect(content).toContain('title: string');
      expect(content).toContain('period: string');
      expect(content).toContain('description: string');
      expect(content).toContain('tags: string[]');
    });

    it('Then I should find a Props interface with projects array', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('projects: Project[]');
    });
  });

  describe('When I check destructuring of props', () => {
    it('Then I should destructure projects from Astro.props', async () => {
      const content = await readComponent();
      expect(content).toContain('const { projects } = Astro.props');
    });
  });

  describe('When I check how projects are rendered', () => {
    it('Then I should map each project to a timeline item', async () => {
      const content = await readComponent();
      expect(content).toContain('projects.map(');
      expect(content).toContain('.timeline-item');
    });

    it('Then I should render period, title, description', async () => {
      const content = await readComponent();
      expect(content).toContain('{project.period}');
      expect(content).toContain('{project.title}');
      expect(content).toContain('{project.description}');
    });

    it('Then I should render tags as a mapped list', async () => {
      const content = await readComponent();
      expect(content).toContain('project.tags.map');
      expect(content).toContain('<span class="tag">{tag}</span>');
    });
  });

  describe('When I check the timeline structure', () => {
    it('Then I should find timeline container with marker and content', async () => {
      const content = await readComponent();
      expect(content).toContain('.timeline');
      expect(content).toContain('.timeline-marker');
      expect(content).toContain('timeline-content');
      expect(content).toContain('.timeline-item');
    });

    it('Then I should find all timeline sub-elements', async () => {
      const content = await readComponent();
      expect(content).toContain('.timeline-period');
      expect(content).toContain('.timeline-title');
      expect(content).toContain('.timeline-desc');
      expect(content).toContain('.timeline-tags');
    });

    it('Then I should have a vertical connector line', async () => {
      const content = await readComponent();
      expect(content).toContain('.timeline::before');
    });
  });
});
