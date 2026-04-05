export interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

export interface Repo {
  name: string;
  description: string;
  url: string;
  language: string;
}

export function validateProject(data: any): data is Project {
  return (
    typeof data === 'object' && data !== null &&
    typeof data.title === 'string' &&
    typeof data.period === 'string' &&
    typeof data.description === 'string' &&
    Array.isArray(data.tags)
  );
}

export function validateCertification(data: any): data is Certification {
  return (
    typeof data === 'object' && data !== null &&
    typeof data.name === 'string' &&
    typeof data.issuer === 'string'
  );
}

export function validateRepo(data: any): data is Repo {
  return (
    typeof data === 'object' && data !== null &&
    typeof data.name === 'string' &&
    typeof data.description === 'string' &&
    typeof data.url === 'string' &&
    typeof data.language === 'string'
  );
}
