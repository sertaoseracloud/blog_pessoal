import { render as domRender } from '@testing-library/dom';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { RenderResult } from '@testing-library/dom';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Simple rendering utility using template strings with interpolation.
 * For unit tests, this provides DOM queries similar to testing-library.
 */
export function renderTemplate(html: string): RenderResult {
  return domRender(html);
}

/**
 * Helper to check element exists in container
 */
export function expectElement(container: HTMLElement, selector: string): HTMLElement | null {
  return container.querySelector(selector);
}

/**
 * Extracts the TypeScript code from Astro frontmatter (between --- markers).
 * Returns the script content for data loading and component imports.
 */
export async function readPageScript(relativePath: string): Promise<string> {
  const fullPath = join(__dirname, '..', relativePath);
  const content = await readFile(fullPath, 'utf-8');
  // Split on frontmatter delimiters, handling both LF and CRLF
  const parts = content.split(/^---$/m);
  if (parts.length >= 3) {
    return parts[1].trim();
  }
  // Fallback: check if content starts/ends with ---\r\n
  const altMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (altMatch) {
    return altMatch[1];
  }
  throw new Error(`No frontmatter found in ${relativePath}`);
}

/**
 * Reads the complete file content of an Astro page (frontmatter + template).
 * Use when tests need to verify template rendering patterns like <Component props={...}>.
 */
export async function readFullPageContent(relativePath: string): Promise<string> {
  const fullPath = join(__dirname, '..', relativePath);
  return readFile(fullPath, 'utf-8');
}

/**
 * Loads all data files using loadData utility for integration tests.
 */
export async function loadPageData(filename: string, validator?: (data: any) => data is any) {
  const { loadData } = await import('../src/utils/data');
  return loadData(filename, validator);
}
