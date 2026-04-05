import { describe, test, expect, beforeAll } from 'vitest';
import { loadPageData, readPageScript, readFullPageContent } from '../../test-utils';
import { loadData } from '../../../src/utils/data';
import { validateProject, validateCertification } from '../../../src/utils/validation';

describe('Given the portfolio page with real data', () => {
  let projects: any[];
  let certifications: any[];

  beforeAll(async () => {
    projects = await loadData('projects.json', validateProject);
    certifications = await loadData('certifications.json', validateCertification);
  });

  describe('When data is loaded for the portfolio page', () => {
    test('Then projects should be loaded and validated', async () => {
      expect(projects.length).toBeGreaterThan(0);
      expect(projects.every(p => typeof p.title === 'string' && typeof p.description === 'string' && Array.isArray(p.tags))).toBe(true);
    });

    test('Then certifications should be loaded with required fields', async () => {
      expect(certifications.length).toBeGreaterThan(0);
      certifications.forEach(c => {
        expect(typeof c.name).toBe('string');
        expect(typeof c.issuer).toBe('string');
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

    test('Then CertificationCard should receive compatible data', async () => {
      expect(certifications.every(c => typeof c.name === 'string')).toBe(true);
      expect(certifications.every(c => typeof c.issuer === 'string')).toBe(true);
    });
  });

  describe('When the portfolio page structure is analyzed', () => {
    test('Then it should import the required components', async () => {
      const script = await readPageScript('src/pages/portfolio.astro');
      expect(script).toContain("import BaseLayout");
      expect(script).toContain("import ProjectTimeline");
      expect(script).toContain("import CertificationCard");
      expect(script).toContain("import { loadData }");
    });

    test('Then it should load data with validators in the frontmatter', async () => {
      const script = await readPageScript('src/pages/portfolio.astro');
      expect(script).toContain("loadData('projects.json', validateProject)");
      expect(script).toContain("loadData('certifications.json', validateCertification)");
    });

    test('Then it should pass data to components via props', async () => {
      const content = await readFullPageContent('src/pages/portfolio.astro');
      expect(content).toContain("<ProjectTimeline projects={");
      expect(content).toContain("<CertificationCard certifications={");
    });
  });
});
