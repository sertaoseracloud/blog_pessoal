import { describe, test, expect, beforeAll } from 'vitest';
import { loadPageData, readPageScript, readFullPageContent } from '../../test-utils';
import { loadData } from '../../../src/utils/data';
import { validateProject } from '../../../src/utils/validation';

describe('Given the portfolio page with real data', () => {
  let projects: any[];
  let badges: any[];

  beforeAll(async () => {
    projects = await loadData('projects.json', validateProject);
    badges = await loadData('credly/badges.json');
  });

  describe('When data is loaded for the portfolio page', () => {
    test('Then projects should be loaded and validated', async () => {
      expect(projects.length).toBeGreaterThan(0);
      expect(projects.every(p => typeof p.title === 'string' && typeof p.description === 'string' && Array.isArray(p.tags))).toBe(true);
    });

    test('Then badges should be loaded with required fields', async () => {
      expect(badges.length).toBeGreaterThan(0);
      badges.forEach(b => {
        expect(typeof b.name).toBe('string');
        expect(typeof b.issuer).toBe('string');
        expect(typeof b.imageUrl).toBe('string');
        expect(typeof b.credentialUrl).toBe('string');
      });
    });

    test('Then each badge should have optional expiresDate and localImagePath', async () => {
      badges.forEach(b => {
        expect(b.expiresDate === undefined || typeof b.expiresDate === 'string').toBe(true);
        expect(b.localImagePath === undefined || typeof b.localImagePath === 'string').toBe(true);
      });
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
      badges.forEach(b => {
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

    test('Then it should load data (projects with validator, badges without)', async () => {
      const script = await readPageScript('src/pages/portfolio.astro');
      expect(script).toContain("loadData('projects.json', validateProject)");
      expect(script).toContain("loadData('credly/badges.json')");
    });

    test('Then it should pass data to components via props', async () => {
      const content = await readFullPageContent('src/pages/portfolio.astro');
      expect(content).toContain("<ProjectTimeline projects={");
      expect(content).toContain("<BadgeCard badge={badge}");
    });
  });
});
