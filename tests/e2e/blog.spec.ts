import { test, expect } from '@playwright/test';
import { BasePage } from './common';

test.describe('Given I visit the blog section', () => {
  test.beforeEach(async ({ page }) => {
    const b = new BasePage(page);
    await b.navigate('/blog_pessoal/blog');
  });

  test('When I load the page Then I should see the blog title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog/);
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('When I load the page Then I should see at least one blog post', async ({ page }) => {
    const cards = page.locator('.blog-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('When I click on a blog post Then I should see the full post content', async ({ page }) => {
    const firstCard = page.locator('.blog-card').first();
    await firstCard.click();
    await page.waitForLoadState('networkidle');

    // URL should include blog post slug
    expect(page.url()).toContain('/blog/primeiro-post');

    // Post header
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Back link exists
    const backLink = page.locator('.back-link');
    await expect(backLink).toHaveText(/Voltar ao Blog/);
    const href = await backLink.getAttribute('href');
    expect(href).toContain('/blog_pessoal/blog');
  });

  test('When I navigate back from a post Then I should return to the blog list', async ({ page }) => {
    // Open a post
    await page.locator('.blog-card').first().click();
    await page.waitForLoadState('networkidle');

    // Go back
    await page.locator('.back-link').click();
    await page.waitForLoadState('networkidle');

    // Confirm on blog index
    await expect(page).toHaveURL(new RegExp('/blog_pessoal/blog$|/blog_pessoal/blog/'));
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });
});
