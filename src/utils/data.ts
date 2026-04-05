import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { validateProject, validateCertification, validateRepo } from './validation';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadData<T>(
  filename: string,
  validator?: (data: any) => data is T
): Promise<T[]> {
  const filePath = join(__dirname, `../../data/${filename}`);
  try {
    const content = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    if (validator) {
      const valid = parsed.filter(validator);
      if (valid.length !== parsed.length) {
        console.warn(`Filtered ${parsed.length - valid.length} invalid items from ${filename}`);
      }
      return valid;
    }
    return parsed as T[];
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return [];
  }
}
