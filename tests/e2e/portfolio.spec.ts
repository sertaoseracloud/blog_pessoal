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

  test('When I scroll down Then I should see certifications', async ({ page }) => {
    const certSection = page.locator('h2:has-text("Certificações")');
    await expect(certSection).toBeVisible();

    const certCards = page.locator('.cert-card');
    const count = await certCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify first cert has name and issuer
    const firstCert = certCards.first();
    await expect(firstCert.locator('.cert-name')).toBeVisible();
    await expect(firstCert.locator('.cert-issuer')).toBeVisible();
  });

  test('When I view certifications Then Microsoft MVP should be listed', async ({ page }) => {
    const names = await page.locator('.cert-name').allTextContents();
    expect(names.some(n => n.includes('Microsoft MVP'))).toBe(true);
  });

  test('When I scroll further Then I should see education section', async ({ page }) => {
    const eduSection = page.locator('h2:has-text("Formação Acadêmica")');
    await expect(eduSection).toBeVisible();

    const eduItems = page.locator('.edu-item');
    const count = await eduItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
