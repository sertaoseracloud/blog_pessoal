import { render as domRender } from '@testing-library/dom';
import type { RenderResult } from '@testing-library/dom';

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
