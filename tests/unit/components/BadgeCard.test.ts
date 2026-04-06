import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/BadgeCard.astro'), 'utf-8');
}

describe('Given the BadgeCard component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Props interface with badge object', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('badge:');
    });

    it('Then badge should have required fields: name, issuer, imageUrl, credentialUrl', async () => {
      const content = await readComponent();
      expect(content).toContain('name: string');
      expect(content).toContain('issuer: string');
      expect(content).toContain('imageUrl: string');
      expect(content).toContain('credentialUrl: string');
    });

    it('Then expiresDate should be optional', async () => {
      const content = await readComponent();
      expect(content).toContain('expiresDate?: string');
    });
  });

  describe('When I check how badge data is rendered', () => {
    it('Then I should render an anchor linking to credentialUrl', async () => {
      const content = await readComponent();
      expect(content).toContain('href={badge.credentialUrl}');
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener"');
      expect(content).toContain('class="card badge-card"');
    });

    it('Then I should render the badge image with lazy loading', async () => {
      const content = await readComponent();
      expect(content).toContain('<img');
      expect(content).toContain('src={badge.imageUrl}');
      expect(content).toContain('alt={badge.name}');
      expect(content).toContain('loading="lazy"');
      expect(content).toContain('class="badge-image"');
    });

    it('Then I should render badge name and issuer', async () => {
      const content = await readComponent();
      expect(content).toContain('{badge.name}');
      expect(content).toContain('{badge.issuer}');
      expect(content).toContain('class="badge-name"');
      expect(content).toContain('class="badge-issuer"');
    });

    it('Then I should conditionally render expiresDate as a tag', async () => {
      const content = await readComponent();
      expect(content).toContain('badge.expiresDate &&');
      expect(content).toContain('class="tag badge-expiry"');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find badge-card styles for card layout', async () => {
      const content = await readComponent();
      expect(content).toContain('.badge-card');
      expect(content).toContain('display: flex');
      expect(content).toContain('flex-direction: column');
      expect(content).toContain('align-items: center');
    });

    it('Then I should find badge-image style with max-height', async () => {
      const content = await readComponent();
      expect(content).toContain('.badge-image');
      expect(content).toContain('max-height: 120px');
      expect(content).toContain('object-fit: contain');
    });

    it('Then I should find badge-name and badge-issuer styles', async () => {
      const content = await readComponent();
      expect(content).toContain('.badge-name');
      expect(content).toContain('.badge-issuer');
      expect(content).toContain('font-size: 1rem');
    });
  });
});
