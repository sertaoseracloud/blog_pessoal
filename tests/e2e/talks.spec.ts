import { test, expect } from '@playwright/test';

test.describe('Given I visit the talks page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/blog_pessoal/talks');
    await page.waitForLoadState('networkidle');
  });

  test('When I load the page Then I should see the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Palestras/);
    await expect(page.getByRole('heading', { name: /Palestras & Workshops/ })).toBeVisible();
  });

  test('When I load the page Then I should see talk cards with speakers', async ({ page }) => {
    const talkCards = page.locator('.talk-card');
    const count = await talkCards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify structure of first talk
    const firstTalk = talkCards.first();
    const title = await firstTalk.locator('h3').textContent();
    expect(title).not.toBeNull();
    expect(title!.length).toBeGreaterThan(0);

    const event = await firstTalk.locator('.talk-event').textContent();
    expect(event).not.toBeNull();

    const year = await firstTalk.locator('.tag').first().textContent();
    expect(year).toMatch(/\d{4}/);
  });

  test('When I scroll through talks Then all talks should have titles', async ({ page }) => {
    const titles = await page.locator('.talk-card h3').allTextContents();
    expect(titles.length).toBeGreaterThanOrEqual(1);
    titles.forEach(title => {
      expect(title.trim().length).toBeGreaterThan(0);
    });
  });

  test('When I view the community section Then I should see leadership roles', async ({ page }) => {
    const communityItems = page.locator('.community-item');
    const count = await communityItems.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstRole = await communityItems.first().locator('h3').textContent();
    expect(firstRole).toContain('Community');
  });

  test('When I scroll to bottom Then I should see open source projects', async ({ page }) => {
    const repoSection = page.locator('h2:has-text("Projetos Open Source")');
    await expect(repoSection).toBeVisible();

    const repoLinks = page.locator('.repo-card');
    const count = await repoLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
