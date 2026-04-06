import { describe, test, expect, beforeAll } from 'vitest';
import { loadPageData, readPageScript, readFullPageContent } from '../../test-utils';
import { loadData } from '../../../src/utils/data';
import { validateProject } from '../../../src/utils/validation';

describe('Given the portfolio page with real data', () => {
  let projects: any[];
  let rawBadges: any[];

  beforeAll(async () => {
    projects = await loadData('projects.json', validateProject);
    rawBadges = await loadData('credly/badges.json');
  });

  describe('When data is loaded for the portfolio page', () => {
    test('Then projects should be loaded and validated', async () => {
      expect(projects.length).toBeGreaterThan(0);
      expect(projects.every(p => typeof p.title === 'string' && typeof p.description === 'string' && Array.isArray(p.tags))).toBe(true);
    });

    test('Then badges should be loaded with required fields', async () => {
      expect(rawBadges.length).toBeGreaterThan(0);
      rawBadges.forEach(b => {
        expect(typeof b.name).toBe('string');
        expect(typeof b.issuer).toBe('string');
        expect(typeof b.imageUrl).toBe('string');
        expect(typeof b.credentialUrl).toBe('string');
      });
    });

    test('Then grouping by issuer produces at least 2 different providers', async () => {
      const issuers = new Set(rawBadges.map(b => b.issuer));
      expect(issuers.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('When checking component data compatibility', () => {
    test('Then ProjectTimeline should receive compatible data', async () => {
      const timelineData = projects.map(p => ({
        title: p.title,
        period: p.period,
        description: p.description,
        tags: p.tags,
      }));
      expect(timelineData.length).toBe(projects.length);
      timelineData.forEach(item => {
        expect(typeof item.title).toBe('string');
        expect(typeof item.period).toBe('string');
      });
    });

    test('Then BadgeCard should receive compatible data', async () => {
      rawBadges.forEach(b => {
        expect(typeof b.name).toBe('string');
        expect(typeof b.issuer).toBe('string');
        expect(typeof b.imageUrl).toBe('string');
        expect(typeof b.credentialUrl).toBe('string');
      });
    });
  });

  describe('When the portfolio page structure is analyzed', () => {
    test('Then it should import the required components', async () => {
      const script = await readPageScript('src/pages/portfolio.astro');
      expect(script).toContain("import BaseLayout");
      expect(script).toContain("import ProjectTimeline");
      expect(script).toContain("import BadgeCard");
      expect(script).toContain("import { loadData }");
    });

    test('Then it should load badges and group them by issuer in script', async () => {
      const script = await readPageScript('src/pages/portfolio.astro');
      expect(script).toContain("loadData('projects.json', validateProject)");
      expect(script).toContain("loadData('credly/badges.json')");
      expect(script).toContain('badgesByIssuer');
      expect(script).toContain('.reduce(');
      // The grouping usage in JSX (Object.entries) is checked in the rendering test
    });

    test('Then it should render issuer groups with title and badge cards', async () => {
      const content = await readFullPageContent('src/pages/portfolio.astro');
      expect(content).toContain('<div class="issuer-group">');
      expect(content).toContain('<h3 class="issuer-title">');
      expect(content).toContain("<BadgeCard badge={badge}");
      expect(content).toContain('Object.entries(badgesByIssuer)');
    });
  });
});
