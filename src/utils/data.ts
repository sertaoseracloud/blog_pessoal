import { readFile } from 'fs/promises';
import { join } from 'path';
import { validateProject, validateCertification, validateRepo } from './validation';

// Resolve data files relative to project root (cwd)
const getDataPath = (filename: string) => join(process.cwd(), 'src/data', filename);

export async function loadData<T>(
  filename: string,
  validator?: (data: any) => data is T
): Promise<T[]> {
  const filePath = getDataPath(filename);
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
