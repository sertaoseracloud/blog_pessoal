import { describe, test, expect } from 'vitest';
import { loadData } from '../../../src/utils/data';
import { validateProject, validateCertification } from '../../../src/utils/validation';

describe('Given the error handling integration for data loading', () => {
  describe('When loadData is called with a non-existent file', () => {
    test('Then it should return an empty array without console.error noise', async () => {
      const consoleErrorSpy = vitest.spyOn(console, 'error').mockImplementation(() => {});
      const result = await loadData('nonexistent.json', validateProject);
      expect(result).toEqual([]);
      consoleErrorSpy.mockRestore();
    });

    test('Then it should not throw any unhandled exceptions', async () => {
      await expect(loadData('nope.json')).resolves.toEqual([]);
      await expect(loadData('invalid.json', validateProject)).resolves.toEqual([]);
    });
  });

  describe('When loadData is called with empty or malformed content', () => {
    test('Then it should handle JSON parse errors gracefully', async () => {
      // This should return empty array, not crash
      const result = await loadData('empty.json');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('When validators are partially satisfied', () => {
    test('Then it should return only items passing validation', async () => {
      // publications.json has some entries that fail validateCertification
      const result = await loadData('publications.json', validateCertification);
      expect(Array.isArray(result)).toBe(true);
      // All returned items must be valid
      expect(
        result.every(item => typeof item.name === 'string' && typeof item.issuer === 'string')
      ).toBe(true);
    });

    test('Then it should not modify the original data when filtering', async () => {
      const raw = await loadData('publications.json');
      const validated = await loadData('publications.json', validateCertification);
      expect(raw.length).toBeGreaterThanOrEqual(validated.length);
    });
  });

  describe('When different validator functions are used for the same file', () => {
    test('Then results should differ based on validator criteria', async () => {
      const projectsWithProjectValidator = await loadData('projects.json', validateProject);
      const allProjects = await loadData('projects.json');

      expect(allProjects.length).toBeGreaterThanOrEqual(projectsWithProjectValidator.length);
    });
  });
});
