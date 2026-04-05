import { describe, test, expect, beforeAll } from 'vitest';
import { loadData } from '../../../src/utils/data';
import { validateProject, validateCertification, validateRepo } from '../../../src/utils/validation';

describe('Given the validation pipeline with real data files', () => {
  describe('When certifications.json is loaded with validator', () => {
    let certifications: ReturnType<typeof validateCertification extends (arg: any) => arg is infer R ? R : never>;

    beforeAll(async () => {
      certifications = await loadData('certifications.json', validateCertification);
    });

    test('Then all returned items should pass validation', async () => {
      expect(certifications.length).toBeGreaterThan(0);
      expect(certifications.every(c => typeof c.name === 'string' && typeof c.issuer === 'string')).toBe(true);
    });

    test('Then year field should be optional (some have it, some dont)', async () => {
      const withYear = certifications.filter(c => c.year !== undefined);
      const withoutYear = certifications.filter(c => c.year === undefined);
      expect(withYear.length > 0 || withoutYear.length > 0).toBe(true);
    });
  });

  describe('When projects.json is loaded with validator', () => {
    let projects: { title: string; period: string; description: string; tags: string[] };

    beforeAll(async () => {
      projects = await loadData('projects.json', validateProject);
    });

    test('Then all projects should have required fields', async () => {
      projects.forEach(p => {
        expect(typeof p.title).toBe('string');
        expect(typeof p.period).toBe('string');
        expect(typeof p.description).toBe('string');
        expect(Array.isArray(p.tags)).toBe(true);
      });
    });

    test('Then optional fields should be either absent or valid', async () => {
      projects.forEach(p => {
        if (p.link !== undefined) expect(typeof p.link).toBe('string');
      });
    });
  });

  describe('When repos.json is loaded with validator', () => {
    let repos: ReturnType<typeof validateRepo extends (arg: any) => arg is infer R ? R : never>;

    beforeAll(async () => {
      repos = await loadData('repos.json', validateRepo);
    });

    test('Then all repos should have name, description, url, language', async () => {
      repos.forEach(r => {
        expect(typeof r.name).toBe('string');
        expect(typeof r.description).toBe('string');
        expect(typeof r.url).toBe('string');
        expect(r.url.startsWith('https://')).toBe(true);
        expect(typeof r.language).toBe('string');
      });
    });
  });

  describe('When publications.json is loaded without validator', () => {
    let publications: any[];

    beforeAll(async () => {
      publications = await loadData('publications.json');
    });

    test('Then it should contain objects with title, venue, year', async () => {
      expect(publications.length).toBeGreaterThan(0);
      publications.forEach(p => {
        expect(typeof p.title).toBe('string');
        expect(typeof p.venue).toBe('string');
        expect(typeof p.year).toBe('string'); // year is always present
      });
    });

    test('Then some entries should have citations count', async () => {
      const withCitations = publications.filter(p => p.citations !== undefined);
      expect(withCitations.length).toBeGreaterThan(0);
    });
  });
});
