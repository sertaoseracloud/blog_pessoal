import { test, expect } from '@playwright/test';
import { BasePage } from './common';

test.describe('Given I visit the blog homepage', () => {
  let page: BasePage;

  test.beforeEach(async ({ page }) => {
    const base = new BasePage(page);
    await base.navigate('/blog_pessoal/');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  });

  test('When I load the page Then I should see the hero section', async ({ page }) => {
    const b = new BasePage(page);
    await b.assertMainContentVisible();
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('When I load the page Then I should see my name and title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.locator('.hero-title').textContent()).toContain('Systems Architect');
  });

  test('When I look at the navigation Then I should see all nav items', async ({ page }) => {
    const b = new BasePage(page);
    await b.assertNavLinks(['Sobre', 'Portfólio', 'Palestras', 'Blog']);
  });

  test('When I load the page Then the stylesheet should be loaded correctly', async ({ page }) => {
    const stylesheets = await page.locator('link[rel="stylesheet"]').all();
    expect(stylesheets.length).toBeGreaterThan(0);
    const href = await stylesheets[0].getAttribute('href');
    expect(href).toContain('/blog_pessoal/_astro/');
  });
});
