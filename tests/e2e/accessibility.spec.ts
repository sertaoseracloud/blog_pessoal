import { test, expect } from '@playwright/test';

test.describe('Given the site is loaded', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/blog_pessoal/');
    await page.waitForLoadState('networkidle');
  });

  test('When I load any page Then no console errors should appear', async ({ page }) => {
    const pages = [
      '/blog_pessoal/',
      '/blog_pessoal/blog',
      '/blog_pessoal/talks',
      '/blog_pessoal/portfolio',
    ];

    for (const path of pages) {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(`http://localhost:4321${path}`);
      await page.waitForLoadState('networkidle');
      expect(consoleErrors).toEqual([]);
    }
  });

  test('When I visit pages Then no 404s should occur', async ({ page }) => {
    const pages = [
      '/blog_pessoal/',
      '/blog_pessoal/blog',
      '/blog_pessoal/talks',
      '/blog_pessoal/portfolio',
    ];

    for (const path of pages) {
      await page.goto(`http://localhost:4321${path}`);
      await page.waitForLoadState('networkidle');
      // Page should not contain "404" in the title
      const title = await page.title();
      expect(title).not.toContain('404');
      expect(title).not.toContain('Not Found');
    }
  });

  test('When I load the mobile version Then the nav should be visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321/blog_pessoal/');
    await page.waitForLoadState('networkidle');
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
  });

  test('When I resize to mobile Then all content should remain visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321/blog_pessoal/');
    await page.waitForLoadState('networkidle');
    const main = page.locator('main');
    await expect(main).toBeInViewport();
  });
});
