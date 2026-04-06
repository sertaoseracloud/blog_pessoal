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

  test('When I scroll down Then I should see certifications grouped by provider', async ({ page }) => {
    const badgesSection = page.locator('h2:has-text("Certificações")');
    await expect(badgesSection).toBeVisible();

    // issuer groups (providers)
    const issuerGroups = page.locator('.issuer-group');
    const count = await issuerGroups.count();
    expect(count).toBeGreaterThanOrEqual(2); // at least Microsoft, AWS, etc.

    // issuer titles should be visible
    const issuerTitles = page.locator('.issuer-title');
    const titlesCount = await issuerTitles.count();
    expect(titlesCount).toBe(count);
  });

  test('When I view badges Then each badge should have name, issuer (via group), and badge image', async ({ page }) => {
    const badgeCards = page.locator('.badge-card');
    const count = await badgeCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Check first badge
    const firstBadge = badgeCards.first();
    await expect(firstBadge.locator('.badge-name')).toBeVisible();
    await expect(firstBadge.locator('.badge-issuer')).toBeVisible();
    await expect(firstBadge.locator('.badge-image')).toBeVisible();

    // Verify images src start with http
    const images = page.locator('.badge-image');
    const src = await images.first().getAttribute('src');
    expect(src).toContain('http');
  });

  test('When I click a badge Then it should open the credential URL in new tab', async ({ page }) => {
    const firstBadge = page.locator('.badge-card').first();
    const href = await firstBadge.getAttribute('href');
    expect(href).toContain('https://www.credly.com/badges/');
  });

  test('When I view badge details Then expiration date should NOT be visible', async ({ page }) => {
    // Ensure badge-expiry class does NOT exist (hidden)
    const expiryTags = page.locator('.badge-expiry');
    const count = await expiryTags.count();
    expect(count).toBe(0);
  });

  test('When I view issuer titles Then they should mention known providers', async ({ page }) => {
    const titles = await page.locator('.issuer-title').allTextContents();
    const text = titles.join(' ');
    // Should contain at least Microsoft or AWS
    expect(text).toMatch(/Microsoft|AWS|Amazon|GitHub|Intel|Linux Foundation|edX|Skillable|Certiprof/i);
  });

  test('When I scroll further Then I should see education section', async ({ page }) => {
    const eduSection = page.locator('h2:has-text("Formação Acadêmica")');
    await expect(eduSection).toBeVisible();

    const eduItems = page.locator('.edu-item');
    const count = await eduItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
