import { describe, test, expect, beforeAll } from 'vitest';
import { readPageScript, readFullPageContent } from '../../test-utils';
import { loadData } from '../../../src/utils/data';

describe('Given the talks page with real talks data', () => {
  let talks: any[];

  beforeAll(async () => {
    talks = await loadData('talks.json');
  });

  describe('When talks.json is loaded', () => {
    test('Then it should return a non-empty array', async () => {
      expect(talks.length).toBeGreaterThan(0);
    });

    test('Then each talk should have required fields (title, event)', async () => {
      talks.forEach(talk => {
        expect(typeof talk.title).toBe('string');
        expect(typeof talk.event).toBe('string');
        expect(talk.title.length).toBeGreaterThan(0);
        expect(talk.event.length).toBeGreaterThan(0);
      });
    });

    test('Then some talks should have years', async () => {
      const withYear = talks.filter(t => t.year !== undefined);
      expect(withYear.length).toBeGreaterThan(0);
    });
  });

  describe('When TalkCard component receives talks data', () => {
    test('Then component data should be compatible with TalkCard rendering', async () => {
      const sample = talks[0];
      expect(() => {
        const { title, event, year } = sample;
      }).not.toThrow();
    });
  });

  describe('When the talks page structure is analyzed', () => {
    test('Then it should import TalkCard and GitHubLinks', async () => {
      const script = await readPageScript('src/pages/talks.astro');
      expect(script).toContain("import TalkCard");
      expect(script).toContain("import GitHubLinks");
      expect(script).toContain("import { loadData }");
    });

    test('Then it should load talks data in frontmatter', async () => {
      const script = await readPageScript('src/pages/talks.astro');
      expect(script).toContain("const talks = await loadData('talks.json')");
    });

    test('Then it should pass talks prop to TalkCard component', async () => {
      const content = await readFullPageContent('src/pages/talks.astro');
      expect(content).toContain("<TalkCard talks={talks} />");
    });

    test('Then it should render community and GitHub sections', async () => {
      const content = await readFullPageContent('src/pages/talks.astro');
      expect(content).toContain('community-list');
      expect(content).toContain("<GitHubLinks />");
    });
  });

  describe('When checking known talk titles', () => {
    test('Then it should include expected talks from the portfolio', async () => {
      const titles = talks.map(t => t.title);
      expect(titles.some(t => t.includes('Plataformização'))).toBe(true);
    });
  });
});
