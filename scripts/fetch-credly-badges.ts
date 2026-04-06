import * as fs from 'fs/promises';
import * as path from 'path';
import * as cheerio from 'cheerio';

const RAW_HTML_FILE = path.join(process.cwd(), 'scripts', 'raw.html');
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'credly');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const JSON_FILE = path.join(OUTPUT_DIR, 'badges.json');

interface CredlyBadge {
  id: string;
  name: string;
  issuer: string;
  issuedDate?: string;
  expiresDate: string;
  imageUrl: string;
  localImagePath: string;
  credentialUrl: string;
}

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {}
}

async function downloadImage(url: string, destPath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.statusText}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(destPath, buffer);
}

export async function fetchCredlyBadges(): Promise<CredlyBadge[]> {
  await ensureDir(OUTPUT_DIR);
  await ensureDir(IMAGES_DIR);

  // Read HTML from local file
  console.log('📖 Reading HTML from raw.html...');
  const html = await fs.readFile(RAW_HTML_FILE, 'utf-8');

  if (html.trim().length === 0) {
    throw new Error('raw.html is empty. Please paste the Credly profile HTML first.');
  }

  console.log('📦 Parsing HTML...');
  const $ = cheerio.load(html);

  const badges: CredlyBadge[] = [];

  $('[data-testid="desktop-badge-card"]').each((_, card) => {
    const $card = $(card);
    const badgeId = $card.attr('href')?.split('/').pop() || Math.random().toString(36).slice(2, 11);

    const nameEl = $card.find('span[data-testid="Typography"][class*="EarnedBadgeCardstyles__BadgeNameText"]');
    const issuerEl = $card.find('span[data-testid="Typography"][class*="EarnedBadgeCardstyles__IssuerText"]');
    const dateEl = $card.find('span[data-testid="Typography"][class*="EarnedBadgeCardstyles__ExpirationDateText"]');
    const imgEl = $card.find('img[src]');
    const credentialUrl = $card.attr('href') || '';

    let expiresDate = '';
    if (dateEl.length) {
      const raw = dateEl.text().trim();
      expiresDate = raw.replace(/^Expires in\s*/i, '').replace(/^Expira em\s*/i, '').trim();
    }

    const name = nameEl.text().replace(/\s+/g, ' ').trim();
    const issuer = issuerEl.text().replace(/\s+/g, ' ').trim();
    const imageUrl = imgEl.attr('src') || '';
    const fullCredentialUrl = credentialUrl.startsWith('http') ? credentialUrl : `https://www.credly.com${credentialUrl}`;

    if (name && imageUrl) {
      badges.push({
        id: badgeId,
        name,
        issuer,
        expiresDate,
        imageUrl,
        credentialUrl: fullCredentialUrl,
        localImagePath: '',
      });
    }
  });

  console.log(`✅ Found ${badges.length} badges`);
  console.log(`📁 Using selectors: data-testid="desktop-badge-card"`);

  // Download images and adjust local path
  for (const badge of badges) {
    try {
      const ext = path.extname(new URL(badge.imageUrl).pathname) || '.png';
      const safeName = badge.name.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase().substring(0, 80);
      const filename = `${safeName}${ext}`;
      const dest = path.join(IMAGES_DIR, filename);

      console.log(`  📥 Downloading: ${badge.name}`);
      await downloadImage(badge.imageUrl, dest);
      badge.localImagePath = `/src/data/credly/images/${filename}`;
    } catch (err) {
      console.error(`  ❌ Failed to download ${badge.name}:`, (err as Error).message);
    }
  }

  // Save JSON
  await fs.writeFile(JSON_FILE, JSON.stringify(badges, null, 2), 'utf-8');
  console.log(`💾 Saved metadata to ${JSON_FILE}`);

  return badges;
}

// CLI entrypoint
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchCredlyBadges()
    .then((badges) => {
      console.log(`\n🎉 Successfully processed ${badges.length} badges!`);
      badges.forEach((b, i) => {
        console.log(`\n${i + 1}. ${b.name}`);
        console.log(`   Issuer: ${b.issuer}`);
        console.log(`   Expires: ${b.expiresDate || 'N/A'}`);
        console.log(`   Image: ${b.localImagePath}`);
      });
    })
    .catch((err) => {
      console.error('❌ Failed:', (err as Error).message);
      process.exit(1);
    });
}
