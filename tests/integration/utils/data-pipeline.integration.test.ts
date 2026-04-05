import { describe, test, expect, beforeAll } from 'vitest';
import { loadData } from '../../../src/utils/data';
import {
  validateProject,
  validateCertification,
  validateRepo,
  Project,
  Certification,
  Repo
} from '../../../src/utils/validation';

describe('Given the data loading pipeline with real data files', () => {
  describe('When loadData is called with projects.json and validator', () => {
    let projects: Project[];

    beforeAll(async () => {
      projects = await loadData('projects.json', validateProject);
    });

    test('Then all returned items should pass project validation', async () => {
      expect(projects.length).toBeGreaterThan(0);
      expect(projects.every(validateProject)).toBe(true);
    });

    test('Then each project should have renderable properties', async () => {
      projects.forEach(p => {
        expect(typeof p.title).toBe('string');
        expect(typeof p.description).toBe('string');
        expect(Array.isArray(p.tags)).toBe(true);
      });
    });
  });

  describe('When loadData is called with certifications.json and validator', () => {
    let certifications: Certification[];

    beforeAll(async () => {
      certifications = await loadData('certifications.json', validateCertification);
    });

    test('Then all returned items should pass certification validation', async () => {
      expect(certifications.length).toBeGreaterThan(0);
      expect(certifications.every(validateCertification)).toBe(true);
    });

    test('Then each certification should have required name and issuer', async () => {
      certifications.forEach(c => {
        expect(typeof c.name).toBe('string');
        expect(typeof c.issuer).toBe('string');
      });
    });
  });

  describe('When loadData is called with repos.json and validator', () => {
    let repos: Repo[];

    beforeAll(async () => {
      repos = await loadData('repos.json', validateRepo);
    });

    test('Then all returned items should pass repo validation', async () => {
      expect(repos.length).toBeGreaterThan(0);
      expect(repos.every(validateRepo)).toBe(true);
    });

    test('Then each repo should have valid URLs', async () => {
      repos.forEach(r => {
        expect(r.url.startsWith('https://')).toBe(true);
      });
    });
  });

  describe('When loadData is called without a validator (raw data)', () => {
    test('Then it should return all items from talks.json as-is', async () => {
      const talks = await loadData('talks.json');
      expect(talks.length).toBeGreaterThan(0);
      expect(Array.isArray(talks)).toBe(true);
    });

    test('Then it should return all items from publications.json as-is (including invalid)', async () => {
      const rawPublications = await loadData('publications.json');
      expect(rawPublications.length).toBeGreaterThan(0);
    });
  });

  describe('When loadData is called with a non-existent file', () => {
    test('Then it should return an empty array without throwing', async () => {
      const result = await loadData('nonexistent.json', validateProject);
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('When the same data file is loaded multiple times', () => {
    test('Then it should return consistent results', async () => {
      const first = await loadData('projects.json', validateProject);
      const second = await loadData('projects.json', validateProject);
      expect(first.length).toBe(second.length);
      expect(first.every((p, i) => p.title === second[i].title)).toBe(true);
    });
  });
});
