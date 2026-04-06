import * as fs from 'fs/promises';
import * as path from 'path';

const BADGES_JSON = path.join(process.cwd(), 'src', 'data', 'credly', 'badges.json');

async function main() {
  const content = await fs.readFile(BADGES_JSON, 'utf-8');
  const badges = JSON.parse(content) as Array<{
    name: string;
    issuer: string;
    expiresDate?: string;
    imageUrl: string;
    credentialUrl: string;
    localImagePath: string;
  }>;

  let changed = 0;
  for (const b of badges) {
    const oldName = b.name;
    const oldIssuer = b.issuer;
    const oldExpires = b.expiresDate;

    b.name = b.name.replace(/\s+/g, ' ').trim();
    b.issuer = b.issuer.replace(/\s+/g, ' ').trim();
    if (b.expiresDate) {
      b.expiresDate = b.expiresDate.replace(/\s+/g, ' ').trim();
    }

    if (oldName !== b.name || oldIssuer !== b.issuer || (b.expiresDate && oldExpires !== b.expiresDate)) {
      changed++;
    }
  }

  await fs.writeFile(BADGES_JSON, JSON.stringify(badges, null, 2), 'utf-8');
  console.log(`Cleaned ${changed} badge entries.`);
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
