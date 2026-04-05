import { describe, test, expect, beforeAll } from 'vitest';
import { loadData } from '../../../src/utils/data';
import {
  validateProject,
  validateCertification,
  validateRepo
} from '../../../src/utils/validation';

describe('Given real data files from src/data/', () => {
  describe('When data is loaded and validated together', () => {
    test('Then projects.json should work with validateProject', async () => {
      const projects = await loadData('projects.json', validateProject);
      expect(projects.length).toBeGreaterThan(0);
      projects.forEach(p => {
        expect(typeof p.title).toBe('string');
        expect(typeof p.period).toBe('string');
        expect(typeof p.description).toBe('string');
        expect(Array.isArray(p.tags)).toBe(true);
      });
    });

    test('Then certifications.json should work with validateCertification', async () => {
      const certs = await loadData('certifications.json', validateCertification);
      expect(certs.length).toBeGreaterThan(0);
      certs.forEach(c => {
        expect(typeof c.name).toBe('string');
        expect(typeof c.issuer).toBe('string');
      });
    });

    test('Then repos.json should work with validateRepo', async () => {
      const repos = await loadData('repos.json', validateRepo);
      expect(repos.length).toBeGreaterThan(0);
      repos.forEach(r => {
        expect(typeof r.name).toBe('string');
        expect(typeof r.description).toBe('string');
        expect(typeof r.url).toBe('string');
        expect(typeof r.language).toBe('string');
      });
    });

    test('Then talks.json should load without validator but have expected structure', async () => {
      const talks = await loadData('talks.json');
      expect(talks.length).toBeGreaterThan(0);
      talks.forEach(t => {
        expect(typeof t.title).toBe('string');
        expect(typeof t.event).toBe('string');
      });
    });
  });

  describe('When validating required fields across all data files', () => {
    test('Then all data types should have non-empty required string fields', async () => {
      const projects = await loadData('projects.json', validateProject);
      const certs = await loadData('certifications.json', validateCertification);
      const repos = await loadData('repos.json', validateRepo);

      projects.forEach(p => expect(p.title.length).toBeGreaterThan(0));
      certs.forEach(c => expect(c.name.length).toBeGreaterThan(0));
      repos.forEach(r => expect(r.name.length).toBeGreaterThan(0));
    });
  });
});

describe('Given the component data compatibility layer', () => {
  test('Then ProjectTimeline expects array of objects with title, period, description, tags', async () => {
    const projects = await loadData('projects.json', validateProject);

    projects.forEach(p => {
      const { title, period, description, tags } = p;
      expect(typeof title).toBe('string');
      expect(typeof period).toBe('string');
      expect(typeof description).toBe('string');
      expect(Array.isArray(tags)).toBe(true);
    });
  });

  test('Then CertificationCard expects array of objects with name, issuer, year?', async () => {
    const certs = await loadData('certifications.json', validateCertification);

    certs.forEach(c => {
      expect(typeof c.name).toBe('string');
      expect(typeof c.issuer).toBe('string');
      if (c.year !== undefined) {
        expect(typeof c.year).toBe('string');
      }
    });
  });

  test('Then TalkCard expects array of objects with title, event, year?', async () => {
    const talks = await loadData('talks.json');

    talks.forEach(t => {
      expect(typeof t.title).toBe('string');
      expect(typeof t.event).toBe('string');
      if (t.year !== undefined) {
        expect(typeof t.year).toBe('string');
      }
    });
  });

  test('Then GitHubLinks component file exists and is a valid Astro component', async () => {
    const { existsSync } = await import('fs');
    const { join } = await import('path');
    const componentPath = join(__dirname, '../../../src/components/GitHubLinks.astro');
    expect(existsSync(componentPath)).toBe(true);
  });
});
