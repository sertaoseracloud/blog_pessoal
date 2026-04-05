// Base URL for the site, set by Astro's base config (e.g., '/blog_pessoal')
export const BASE_URL = import.meta.env.BASE_URL ?? '/';

// Helper to join base with a path, ensuring exactly one slash between
export function joinBase(...pathSegments: string[]): string {
  const cleaned = pathSegments
    .map((seg) => seg.replace(/^\/|\/$/g, '')) // strip leading/trailing slashes
    .filter(Boolean);
  return `${BASE_URL}/${cleaned.join('/')}`;
}
