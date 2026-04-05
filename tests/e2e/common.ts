import { expect, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async getBaseURL() {
    return this.page.context().request().defaultOptions.baseURL || '';
  }

  async assertPageTitleContains(title: string) {
    await expect(this.page).toHaveTitle(new RegExp(title));
  }

  async assertMainContentVisible() {
    const main = this.page.locator('main');
    await expect(main).toBeVisible();
  }

  async assertNavLinks(labels: string[]) {
    const navLinks = this.page.locator('.nav-link');
    const actualTexts = await navLinks.allTextContents();
    // Trim whitespace around texts
    expect(actualTexts.map(t => t.trim())).toEqual(labels);
  }

  async clickNavLink(label: string) {
    const link = this.page.getByRole('link', { name: label });
    await link.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertLinkHasBasePath(linkText: string, expectedPath: string) {
    const link = this.page.getByRole('link', { name: linkText });
    const href = await link.getAttribute('href');
    expect(href).toContain(expectedPath);
  }
}
