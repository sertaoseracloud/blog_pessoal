import { describe, it, expect } from 'vitest';
import { validateProject, validateCertification, validateRepo } from '../../../src/utils/validation';

describe('Utils: Validation Type Guards', () => {
  describe('validateProject', () => {
    it('accepts valid project object', () => {
      const project = {
        title: 'Test Project',
        period: '2024',
        description: 'A test project',
        tags: ['test'],
      };
      expect(validateProject(project)).toBe(true);
    });

    it('rejects project without required fields', () => {
      expect(validateProject({ title: 'Test' })).toBe(false);
      expect(validateProject(null)).toBe(false);
      expect(validateProject({})).toBe(false);
    });
  });

  describe('validateCertification', () => {
    it('accepts valid certification', () => {
      expect(validateCertification({ name: 'Cert', issuer: 'Org' })).toBe(true);
    });
    it('rejects invalid', () => {
      expect(validateCertification({ name: 'Cert' })).toBe(false);
    });
  });

  describe('validateRepo', () => {
    it('accepts valid repo', () => {
      expect(validateRepo({
        name: 'repo',
        description: 'desc',
        url: 'https://github.com/test/repo',
        language: 'TypeScript'
      })).toBe(true);
    });
  });
});
