import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Component: CertificationCard.astro', () => {
  it('defines Certification interface with name and issuer', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
    expect(content).toContain('name:');
    expect(content).toContain('issuer:');
  });

  it('defines optional year field', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
    expect(content).toContain('year?:');
  });

  it('defines Props interface with certifications array', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
    expect(content).toContain('certifications: Certification[]');
  });

  it('maps certifications to cards', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
    expect(content).toContain('certifications.map(');
    expect(content).toContain('cert.name');
    expect(content).toContain('cert.issuer');
  });

  it('conditionally renders year badge', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
    expect(content).toContain('{cert.year');
  });

  it('has cert-grid layout', async () => {
    const content = await readFile(join(__dirname, '../../../src/components/CertificationCard.astro'), 'utf-8');
    expect(content).toContain('.cert-grid');
  });
});
