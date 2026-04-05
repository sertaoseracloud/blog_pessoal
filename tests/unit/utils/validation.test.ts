import { describe, test, expect } from 'vitest';
import { validateProject, validateCertification, validateRepo } from '../../../src/utils/validation';

describe('Given the validation utility module', () => {
  describe('When validating a project object', () => {
    test('Then it should accept a valid project with all required fields', () => {
      const project = {
        title: 'Test Project',
        period: '2024',
        description: 'A test project',
        tags: ['test'],
      };
      expect(validateProject(project)).toBe(true);
    });

    test('Then it should reject a project missing required title field', () => {
      expect(validateProject({ period: '2024', description: 'desc', tags: [] })).toBe(false);
    });

    test('Then it should reject a project missing required description field', () => {
      expect(validateProject({ title: 'Test', period: '2024', tags: [] })).toBe(false);
    });

    test('Then it should reject null as invalid', () => {
      expect(validateProject(null)).toBe(false);
    });

    test('Then it should reject an empty object as invalid', () => {
      expect(validateProject({})).toBe(false);
    });

    test('Then it should accept a project with optional fields omitted', () => {
      const minimalProject = { title: 'Minimal', period: '2024', description: 'Minimal desc', tags: [] };
      expect(validateProject(minimalProject)).toBe(true);
    });

    test('Then it should accept a project with all optional fields present', () => {
      const fullProject = {
        title: 'Full Project',
        description: 'Full desc',
        tags: ['tag1', 'tag2'],
        period: '2023-2024',
        link: 'https://example.com',
      };
      expect(validateProject(fullProject)).toBe(true);
    });
  });

  describe('When validating a certification object', () => {
    test('Then it should accept a valid certification with required fields', () => {
      const certification = { name: 'AWS Certified', issuer: 'Amazon' };
      expect(validateCertification(certification)).toBe(true);
    });

    test('Then it should reject a certification missing required name field', () => {
      expect(validateCertification({ issuer: 'Amazon' })).toBe(false);
    });

    test('Then it should reject a certification missing required issuer field', () => {
      expect(validateCertification({ name: 'Cert' })).toBe(false);
    });

    test('Then it should reject null as invalid', () => {
      expect(validateCertification(null)).toBe(false);
    });

    test('Then it should reject an empty object as invalid', () => {
      expect(validateCertification({})).toBe(false);
    });

    test('Then it should accept a certification with optional year field', () => {
      const cert = { name: 'Cert', issuer: 'Org', year: 2024 };
      expect(validateCertification(cert)).toBe(true);
    });
  });

  describe('When validating a repository object', () => {
    test('Then it should accept a valid repo with all required fields', () => {
      const repo = {
        name: 'my-repo',
        description: 'A cool repo',
        url: 'https://github.com/user/my-repo',
        language: 'TypeScript',
      };
      expect(validateRepo(repo)).toBe(true);
    });

    test('Then it should reject a repo missing required name field', () => {
      expect(validateRepo({ description: 'desc', url: 'url', language: 'TS' })).toBe(false);
    });

    test('Then it should reject a repo missing required description field', () => {
      expect(validateRepo({ name: 'repo', url: 'url', language: 'TS' })).toBe(false);
    });

    test('Then it should reject a repo missing required url field', () => {
      expect(validateRepo({ name: 'repo', description: 'desc', language: 'TS' })).toBe(false);
    });

    test('Then it should reject a repo missing required language field', () => {
      expect(validateRepo({ name: 'repo', description: 'desc', url: 'url' })).toBe(false);
    });

    test('Then it should reject null as invalid', () => {
      expect(validateRepo(null)).toBe(false);
    });

    test('Then it should reject an empty object as invalid', () => {
      expect(validateRepo({})).toBe(false);
    });

    test('Then it should accept a repo with additional optional fields', () => {
      const repo = {
        name: 'repo',
        description: 'desc',
        url: 'https://github.com/user/repo',
        language: 'TS',
        topics: ['astro', 'typescript'],
        stars: 100,
      };
      expect(validateRepo(repo)).toBe(true);
    });
  });
});
