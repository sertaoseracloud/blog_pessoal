import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

const CREDLY_URL = 'https://www.credly.com/users/claudio-filipe-lima-raposo/badges';
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'credly');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

interface CredlyBadge {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  imageUrl: string;
  description?: string;
}

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // ignore if exists
  }
}

async function downloadImage(url: string, destPath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.statusText}`);
  const buffer = await response.buffer();
  await fs.writeFile(destPath, buffer);
}

export async function fetchCredlyBadges(): Promise<CredlyBadge[]> {
  await ensureDir(OUTPUT_DIR);
  await ensureDir(IMAGES_DIR);

  const browser: Browser = await chromium.launch({ headless: true });
  const page: Page = await browser.newPage();

  try {
    // Navigate to Credly (public page)
    await page.goto(CREDLY_URL, { waitUntil: 'networkidle' });

    // Wait for badges to load
    await page.waitForSelector('[data-testid="badge-card"]', { timeout: 30000 });

    // Scroll to load all badges (lazy load)
    let previousHeight = 0;
    while (true) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(2000);
      const newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (newHeight === previousHeight) break;
      previousHeight = newHeight;
    }

    // Extract badge data
    const badges: CredlyBadge[] = await page.$$eval('[data-testid="badge-card"]', (cards) => {
      return cards.map(card => {
        const nameEl = card.querySelector('h3') || card.querySelector('[data-testid="badge-name"]');
        const issuerEl = card.querySelector('[data-testid="badge-issuer"]') || card.querySelector('.issuer-name');
        const dateEl = card.querySelector('[data-testid="badge-issued-date"]');
        const imgEl = card.querySelector('img[data-testid="badge-image"]') || card.querySelector('img');
        const descEl = card.querySelector('[data-testid="badge-description"]');

        const id = card.getAttribute('data-badge-id') || Math.random().toString(36).substr(2, 9);

        return {
          id,
          name: nameEl?.textContent?.trim() || '',
          issuer: issuerEl?.textContent?.trim() || '',
          issuedDate: dateEl?.textContent?.replace('Issued', '').trim() || '',
          imageUrl: imgEl?.getAttribute('src') || '',
          description: descEl?.textContent?.trim() || '',
        };
      }).filter(b => b.name && b.imageUrl);
    });

    console.log(`Found ${badges.length} badges`);

    // Download images and save metadata
    const result: CredlyBadge[] = [];
    for (const badge of badges) {
      try {
        const ext = path.extname(badge.imageUrl.split('?')[0]) || '.png';
        const imageFilename = `${badge.id}${ext}`;
        const imagePath = path.join(IMAGES_DIR, imageFilename);

        await downloadImage(badge.imageUrl, imagePath);
        console.log(`Downloaded: ${badge.name} → ${imageFilename}`);

        result.push({
          ...badge,
          imageUrl: `/src/data/credly/images/${imageFilename}`, // relative path for use in Astro
        });
      } catch (err) {
        console.error(`Failed to download ${badge.name}:`, err);
      }
    }

    // Save JSON metadata
    const jsonPath = path.join(OUTPUT_DIR, 'badges.json');
    await fs.writeFile(jsonPath, JSON.stringify(result, null, 2));
    console.log(`Saved metadata to ${jsonPath}`);

    return result;
  } finally {
    await browser.close();
  }
}

// CLI entrypoint
if (import.meta.main) {
  try {
    const badges = await fetchCredlyBadges();
    console.log(`✓ Successfully fetched ${badges.length} badges`);
  } catch (error) {
    console.error('Failed to fetch badges:', error);
    process.exit(1);
  }
}
