import { test, expect } from '@playwright/test';

test.describe('Given I navigate through the site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/blog_pessoal/');
    await page.waitForLoadState('networkidle');
  });

  test('When I click on "Sobre" Then I should stay on homepage', async ({ page }) => {
    await page.getByRole('link', { name: 'Sobre' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Cláudio Raposo/);
  });

  test('When I click on "Portfólio" Then I should be on the portfolio page', async ({ page }) => {
    await page.getByRole('link', { name: 'Portfólio' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/blog_pessoal\/portfolio/);
    await expect(page).toHaveTitle(/Portfólio/);
  });

  test('When I click on "Palestras" Then I should be on the talks page', async ({ page }) => {
    await page.getByRole('link', { name: 'Palestras' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/blog_pessoal\/talks/);
    await expect(page).toHaveTitle(/Palestras/);
  });

  test('When I click on "Blog" Then I should be on the blog index page', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/blog_pessoal\/blog/);
    await expect(page).toHaveTitle(/Blog/);
  });

  test('When I click on the site logo Then I should go to homepage', async ({ page }) => {
    await page.locator('.nav-logo').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/blog_pessoal\/$/);
    await expect(page).toHaveTitle(/Cláudio Raposo/);
  });

  test('When I visit talks Then click on Portfólio Then I should arrive at portfolio', async ({ page }) => {
    // Go to talks
    await page.goto('http://localhost:4321/blog_pessoal/talks');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/blog_pessoal\/talks/);

    // Then click Portfolio link
    await page.getByRole('link', { name: 'Portfólio' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/blog_pessoal\/portfolio/);
  });

  test('When I visit portfolio Then click on Talks Then I should arrive at talks', async ({ page }) => {
    await page.goto('http://localhost:4321/blog_pessoal/portfolio');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Portfólio/);

    await page.getByRole('link', { name: 'Palestras' }).click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/blog_pessoal/talks');
    expect(await page.title()).toContain('Palestras');
  });
});
