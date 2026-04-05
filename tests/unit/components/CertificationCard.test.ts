import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readComponent() {
  return readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
}

describe('Given the CertificationCard component source', () => {
  describe('When I check its interface definitions', () => {
    it('Then I should find a Certification interface with name and issuer', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Certification');
      expect(content).toContain('name: string');
      expect(content).toContain('issuer: string');
    });

    it('Then I should find an optional year field', async () => {
      const content = await readComponent();
      expect(content).toContain('year?: string');
    });

    it('Then I should find a Props interface with certifications array', async () => {
      const content = await readComponent();
      expect(content).toContain('interface Props');
      expect(content).toContain('certifications: Certification[]');
    });
  });

  describe('When I check how certifications are rendered', () => {
    it('Then I should map each certification to a card', async () => {
      const content = await readComponent();
      expect(content).toContain('certifications.map(');
      expect(content).toContain('cert.name');
      expect(content).toContain('cert.issuer');
    });

    it('Then I should conditionally render the year badge', async () => {
      const content = await readComponent();
      expect(content).toContain('cert.year &&');
      expect(content).toContain('.cert-year');
    });
  });

  describe('When I check the styling', () => {
    it('Then I should find cert-grid layout with CSS Grid', async () => {
      const content = await readComponent();
      expect(content).toContain('.cert-grid');
      expect(content).toContain('display: grid');
    });

    it('Then I should find styles for cert-card elements', async () => {
      const content = await readComponent();
      expect(content).toContain('.cert-card');
      expect(content).toContain('.cert-name');
      expect(content).toContain('.cert-issuer');
      expect(content).toContain('.cert-year');
    });
  });
});
