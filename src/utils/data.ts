import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadData<T>(filename: string): Promise<T[]> {
  const filePath = join(__dirname, `../../data/${filename}`);
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return [];
  }
}
