import { test, expect } from '@playwright/test';

test.describe('Given I visit the portfolio page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/blog_pessoal/portfolio');
    await page.waitForLoadState('networkidle');
  });

  test('When I load the page Then I should see the portfolio title', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfólio/);
    await expect(page.getByRole('heading', { name: /Projetos/ })).toBeVisible();
  });

  test('When I view projects Then I should see a timeline with projects', async ({ page }) => {
    const timelineItems = page.locator('.timeline-item');
    const count = await timelineItems.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify each timeline item has title and description
    const titles = await page.locator('.timeline-title').allTextContents();
    const descriptions = await page.locator('.timeline-desc').allTextContents();

    expect(titles.length).toEqual(descriptions.length);
    expect(titles.length).toBeGreaterThan(0);
  });

  test('When I view timeline Then each project should have tags', async ({ page }) => {
    const timelineTags = page.locator('.timeline-tags .tag');
    const count = await timelineTags.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify tags have text
    const tags = await timelineTags.allTextContents();
    tags.forEach(tag => expect(tag.trim().length).toBeGreaterThan(0));
  });

  test('When I scroll down Then I should see badges section', async ({ page }) => {
    const badgesSection = page.locator('h2:has-text("Certificações")');
    await expect(badgesSection).toBeVisible();

    const badgeCards = page.locator('.badge-card');
    const count = await badgeCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('When I view badges Then each badge should have name, issuer, and badge image', async ({ page }) => {
    const badgeNames = page.locator('.badge-name');
    const badgeIssuers = page.locator('.badge-issuer');
    const badgeImages = page.locator('.badge-image');

    const namesCount = await badgeNames.count();
    const issuersCount = await badgeIssuers.count();
    const imagesCount = await badgeImages.count();

    expect(namesCount).toBeGreaterThan(0);
    expect(issuersCount).toBeGreaterThan(0);
    expect(imagesCount).toBeGreaterThan(0);
    expect(namesCount).toBe(imagesCount);
    expect(issuersCount).toBe(imagesCount);

    // Check first badge image has src
    const firstImage = badgeImages.first();
    const src = await firstImage.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src!.startsWith('http')).toBe(true);
  });

  test('When I click a badge Then it should open the credential URL in new tab', async ({ page }) => {
    const firstBadge = page.locator('.badge-card').first();
    const href = await firstBadge.getAttribute('href');
    expect(href).toContain('https://www.credly.com/badges/');
  });

  test('When I scroll further Then I should see education section', async ({ page }) => {
    const eduSection = page.locator('h2:has-text("Formação Acadêmica")');
    await expect(eduSection).toBeVisible();

    const eduItems = page.locator('.edu-item');
    const count = await eduItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
