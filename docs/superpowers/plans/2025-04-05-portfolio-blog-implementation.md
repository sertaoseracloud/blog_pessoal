# Portfolio & Blog Pessoal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio site with blog using AstroJS, deployed to GitHub Pages, featuring Cláudio Filipe Lima Raposo's professional profile with dedicated sections for certifications, publications, talks, and a Markdown-based blog.

**Architecture:** Multi-page AstroJS site with dedicated pages (home, portfolio, talks, blog), dark theme, static site generation, and GitHub Pages deployment via GitHub Actions.

**Tech Stack:** AstroJS 5.x, Markdown content collections, CSS custom properties (dark theme), no external UI frameworks.

---

## File Structure

### To Create
| File | Responsibility |
|------|---------------|
| `package.json` | Project dependencies and scripts |
| `astro.config.mjs` | Astro config with GitHub Pages base path |
| `tsconfig.json` | TypeScript configuration |
| `.gitignore` | Ignore node_modules, dist, .astro |
| `src/layouts/BaseLayout.astro` | Master layout with head, Navbar, and footer |
| `src/components/Navbar.astro` | Top navigation bar with active state |
| `src/components/ProjectTimeline.astro` | Vertical project timeline component |
| `src/components/CertificationCard.astro` | Certification display card |
| `src/components/TalkCard.astro` | Talk/event display card |
| `src/components/BlogCard.astro` | Blog post listing card |
| `src/components/GitHubLinks.astro` | Open source repo links grid |
| `src/content/config.ts` | Astro content collections schema for blog |
| `src/content/blog/first-post.md` | Sample blog post |
| `src/pages/index.astro` | Home page — Hero + About + Expertise |
| `src/pages/portfolio.astro` | Portfolio — projects, certifications, publications, education |
| `src/pages/talks.astro` | Talks, community leadership, and open source |
| `src/pages/blog/index.astro` | Blog listing page |
| `src/pages/blog/[...slug].astro` | Dynamic route for individual blog posts |
| `src/styles/global.css` | Dark theme CSS custom properties and global styles |
| `public/robots.txt` | Robots file for search engines |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for GitHub Pages deployment |

---

### Task 1: Project Scaffolding

**Files to create:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/styles/global.css`, `public/robots.txt`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "blog-pessoal",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create astro.config.mjs**

> Replace `claudioraposo` with actual GitHub username and `blog_pessoal` with actual repo name.

```mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.NODE_ENV === 'production'
    ? 'https://claudioraposo.github.io'
    : 'http://localhost:4321',
  base: process.env.NODE_ENV === 'production' ? '/blog_pessoal' : '',
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: Create src/styles/global.css**

```css
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --bg-tertiary: #21262d;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --accent: #58a6ff;
  --accent-hover: #79b8ff;
  --border: #30363d;
  --card-bg: #161b22;
  --code-bg: #1a1e24;
  --success: #3fb950;
  --font-mono: 'Fira Code', 'Cascadia Code', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --max-width: 1100px;
  --radius: 8px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

a { color: var(--accent); text-decoration: none; transition: color 0.2s; }
a:hover { color: var(--accent-hover); }

.container { max-width: var(--max-width); margin: 0 auto; padding: 0 2rem; }
.section { padding: 4rem 0; }

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 0.5rem;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(88, 166, 255, 0.15);
}

.tag {
  display: inline-block;
  background: var(--bg-tertiary);
  color: var(--accent);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 0.4rem;
}

.btn {
  display: inline-block;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 0.2s;
}
.btn-primary { background: var(--accent); color: var(--bg-primary); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { border: 1px solid var(--border); color: var(--text-primary); }
.btn-secondary:hover { background: var(--bg-tertiary); }

code {
  font-family: var(--font-mono);
  background: var(--code-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .container { padding: 0 1rem; }
  .section { padding: 2rem 0; }
}
```

- [ ] **Step 6: Create public/robots.txt**

```
User-agent: *
Allow: /
```

- [ ] **Step 7: Create directories**

```bash
mkdir -p src/{layouts,components,styles,pages/{blog},content/blog}
```

- [ ] **Step 8: Install deps and verify**

```bash
npm install
```

- [ ] **Step 9: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore src/styles/global.css public/robots.txt
git commit -m "chore: scaffold AstroJS project with dark theme globals"
```

---

### Task 2: Base Layout & Navbar

**Files:** `src/components/Navbar.astro`, `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create Navbar.astro**

```astro
---
interface Props {
  currentPage?: string;
}

const { currentPage = 'home' } = Astro.props;

const navLinks = [
  { href: '/', label: 'Sobre', page: 'home' },
  { href: '/portfolio', label: 'Portfólio', page: 'portfolio' },
  { href: '/talks', label: 'Palestras', page: 'talks' },
  { href: '/blog', label: 'Blog', page: 'blog' },
];
---

<nav class="navbar">
  <div class="container nav-content">
    <a href="/" class="nav-logo">Cláudio Raposo</a>
    <ul class="nav-links">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class:list={['nav-link', { active: currentPage === link.page }]}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>

<style>
  .navbar {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-logo {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  .nav-logo:hover { color: var(--accent); }
  .nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
  }
  .nav-link {
    color: var(--text-secondary);
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius);
    transition: all 0.2s;
  }
  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
  }
  .nav-link.active {
    color: var(--accent);
    background: var(--bg-tertiary);
  }
  @media (max-width: 768px) {
    .nav-content {
      flex-direction: column;
      gap: 1rem;
    }
    .nav-links { gap: 0.5rem; }
  }
</style>
```

- [ ] **Step 2: Create BaseLayout.astro**

```astro
---
interface Props {
  title: string;
  currentPage?: string;
}

const { title, currentPage } = Astro.props;
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Portfólio pessoal e blog de Cláudio Filipe Lima Raposo — Arquiteto de Software, Professor e Palestrante." />
    <title>{title}</title>
    <link rel="stylesheet" href="/styles/global.css" />
  </head>
  <body>
    <Navbar currentPage={currentPage} />
    <slot />
    <footer class="footer">
      <div class="container">
        <p>&copy; {new Date().getFullYear()} Cláudio Filipe Lima Raposo. Todos os direitos reservados.</p>
      </div>
    </footer>
  </body>
</html>

<style>
  .footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
    padding: 2rem 0;
    text-align: center;
    color: var(--text-secondary);
    margin-top: 4rem;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/Navbar.astro
git commit -m "feat: add base layout and dark theme navbar"
```

---

### Task 3: Home Page

**Files:** `src/pages/index.astro`

- [ ] **Step 1: Create index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Cláudio Raposo — Systems Architect & Professor" currentPage="home">
  <main>
    <section class="container section hero">
      <div class="hero-content">
        <h1 class="hero-name">Cláudio Filipe Lima Raposo</h1>
        <p class="hero-title">Systems Architect &amp; Project Leader @ NTT DATA</p>
        <p class="hero-subtitle">Professor | Microsoft MVP | Docker Captain</p>
        <div class="hero-links">
          <a href="https://github.com/claudioraposo" target="_blank" rel="noopener" class="btn btn-primary">GitHub</a>
          <a href="https://linkedin.com/in/claudioraposo" target="_blank" rel="noopener" class="btn btn-secondary">LinkedIn</a>
          <a href="https://scholar.google.com" target="_blank" rel="noopener" class="btn btn-secondary">Google Scholar</a>
        </div>
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title">Sobre Mim</h2>
      <div class="about-content">
        <p>Profissional brasileiro de destaque nas áreas de <strong>tecnologia da informação</strong>, <strong>arquitetura de software</strong> e <strong>computação em nuvem</strong>. Reconhecido por sua expertise em arquiteturas distribuídas, DevOps, cloud computing e desenvolvimento de software.</p>
        <p>Atua como <strong>Systems Architect &amp; Project Leader</strong> na NTT DATA, liderando o design de arquiteturas distribuídas e multicloud. É também <strong>professor de graduação</strong> na FIAP e em outras instituições, ministrando disciplinas como Programação Web, Algoritmos, Estruturas de Dados e Cloud Computing.</p>
        <p>Possui <strong>71 citações totais</strong> no Google Scholar, com índice h de 4. Acumula prêmios internacionais como <strong>Microsoft MVP</strong>, <strong>Docker Captain</strong> e <strong>Green Software Champion</strong>.</p>
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title">Áreas de Especialização</h2>
      <div class="expertise-grid">
        <div class="expertise-card">
          <h3>Arquitetura de Software</h3>
          <p>Microserviços, Cell-Based Architecture, DDD, SOLID</p>
        </div>
        <div class="expertise-card">
          <h3>Cloud Computing</h3>
          <p>Azure, AWS, GCP, automação e governança multicloud</p>
        </div>
        <div class="expertise-card">
          <h3>DevOps &amp; Containers</h3>
          <p>Kubernetes (AKS/EKS), Docker, Terraform, CI/CD</p>
        </div>
        <div class="expertise-card">
          <h3>Segurança &amp; LGPD</h3>
          <p>Conformidade, proteção de dados, segurança em cloud</p>
        </div>
      </div>
    </section>
  </main>
</BaseLayout>

<style>
  .hero {
    min-height: 60vh;
    display: flex;
    align-items: center;
    text-align: center;
    background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    border-radius: var(--radius);
    padding: 4rem 2rem;
  }
  .hero-name {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, var(--accent), var(--accent-hover));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
  .hero-title {
    font-size: 1.4rem;
    color: var(--text-secondary);
    margin-bottom: 0.3rem;
  }
  .hero-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
  .hero-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .about-content {
    font-size: 1.1rem;
    max-width: 800px;
  }
  .about-content p { margin-bottom: 1rem; }
  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .expertise-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  .expertise-card h3 { color: var(--accent); margin-bottom: 0.5rem; }
  .expertise-card p { color: var(--text-secondary); }
  @media (max-width: 768px) {
    .hero-name { font-size: 2rem; }
    .hero { min-height: auto; padding: 2rem 0; }
  }
</style>
```

- [ ] **Step 2: Verify with dev server**

```bash
npm run dev
```

Expected: Home page renders with hero, about section, and expertise grid in dark theme.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add home page with hero, about, and expertise sections"
```

---

### Task 4: Portfolio Page

**Files:** `src/components/ProjectTimeline.astro`, `src/components/CertificationCard.astro`, `src/pages/portfolio.astro`

- [ ] **Step 1: Create ProjectTimeline.astro**

```astro
---
interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
}

interface Props {
  projects: Project[];
}

const { projects } = Astro.props;
---

<div class="timeline">
  {projects.map((project) => (
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content card">
        <span class="timeline-period">{project.period}</span>
        <h3 class="timeline-title">{project.title}</h3>
        <p class="timeline-desc">{project.description}</p>
        <div class="timeline-tags">
          {project.tags.map((tag) => <span class="tag">{tag}</span>)}
        </div>
      </div>
    </div>
  ))}
</div>

<style>
  .timeline {
    position: relative;
    padding-left: 2rem;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }
  .timeline-item { position: relative; margin-bottom: 2rem; }
  .timeline-marker {
    position: absolute;
    left: -2rem;
    top: 0.3rem;
    width: 12px;
    height: 12px;
    background: var(--accent);
    border-radius: 50%;
    border: 2px solid var(--bg-primary);
    z-index: 1;
  }
  .timeline-period { font-size: 0.85rem; color: var(--text-secondary); }
  .timeline-title { margin: 0.3rem 0; }
  .timeline-desc { color: var(--text-secondary); margin-bottom: 0.8rem; }
  .timeline-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
</style>
```

- [ ] **Step 2: Create CertificationCard.astro**

```astro
---
interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

interface Props {
  certifications: Certification[];
}

const { certifications } = Astro.props;
---

<div class="cert-grid">
  {certifications.map((cert) => (
    <div class="cert-card card">
      <h3 class="cert-name">{cert.name}</h3>
      <p class="cert-issuer">{cert.issuer}</p>
      {cert.year && <span class="cert-year">{cert.year}</span>}
    </div>
  ))}
</div>

<style>
  .cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .cert-card { padding: 1.2rem; }
  .cert-name { font-size: 1rem; margin-bottom: 0.3rem; }
  .cert-issuer { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; }
  .cert-year {
    display: inline-block;
    background: var(--bg-tertiary);
    color: var(--accent);
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
  }
</style>
```

- [ ] **Step 3: Create portfolio.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectTimeline from '../components/ProjectTimeline.astro';
import CertificationCard from '../components/CertificationCard.astro';

const projects = [
  {
    title: 'Arquitetura Celular Multicloud — NTT DATA',
    period: 'Jan 2025 – Atual',
    description: 'Design de arquiteturas distribuídas com AKS e EKS, proxies sidecar em Golang integrados ao Cosmos DB e MongoDB. Ganho de 30% em tempo de resposta.',
    tags: ['AKS', 'EKS', 'Golang', 'Terraform', 'CI/CD'],
  },
  {
    title: 'Automação de Pipelines CI/CD — CI&T',
    period: 'Set 2023 – Jan 2025',
    description: 'Padrões e práticas para automação em nuvem, orquestração de entregas e suporte em DevOps.',
    tags: ['Azure', 'Azure DevOps', 'Pipelines', 'DevOps'],
  },
  {
    title: 'nestjs-viacep — Open Source',
    period: '2024',
    description: 'Módulo NestJS para consulta de endereços via ViaCep em TypeScript.',
    tags: ['TypeScript', 'NestJS', 'Open Source'],
  },
  {
    title: 'nestjs-dataprotection — Open Source',
    period: '2024',
    description: 'Módulo para proteção de dados sensíveis, alinhado à LGPD.',
    tags: ['TypeScript', 'NestJS', 'LGPD', 'Open Source'],
  },
  {
    title: 'gRPC Microservices — Open Source',
    period: '2024',
    description: 'Microserviços comunicando-se via gRPC — arquitetura distribuída.',
    tags: ['gRPC', 'Microservices', 'Open Source'],
  },
];

const certifications = [
  { name: 'Microsoft MVP', issuer: 'Microsoft', year: '2024-2025' },
  { name: 'Microsoft Certified Trainer (MCT)', issuer: 'Microsoft' },
  { name: 'Docker Captain', issuer: 'Docker' },
  { name: 'Green Software Champion', issuer: 'Green Software Foundation' },
  { name: 'AZ-400: DevOps Engineer Expert', issuer: 'Microsoft' },
  { name: 'AZ-204: Azure Developer Associate', issuer: 'Microsoft' },
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
  { name: 'Lean Six Sigma Green Belt', issuer: 'Voith', year: '2020' },
];

const publications = [
  {
    title: 'LGPD em TI: Implementação da Lei Geral de Proteção de Dados',
    venue: 'Qualis A2',
    citations: 43,
    year: '2023',
  },
  {
    title: 'Arquitetura Celular na Computação em Nuvem: Resiliência, Escalabilidade e Tendências',
    venue: 'Editora Impacto Científico',
    year: '2025',
  },
];
---

<BaseLayout title="Portfólio — Cláudio Raposo" currentPage="portfolio">
  <main>
    <section class="container section">
      <h2 class="section-title">Projetos — Timeline</h2>
      <ProjectTimeline projects={projects} />
    </section>

    <section class="container section">
      <h2 class="section-title">Certificações</h2>
      <CertificationCard certifications={certifications} />
    </section>

    <section class="container section">
      <h2 class="section-title">Publicações Científicas</h2>
      <div class="pub-list">
        {publications.map((pub) => (
          <div class="card pub-card">
            <h3>{pub.title}</h3>
            <p class="pub-venue">{pub.venue}</p>
            {pub.year && <span class="pub-year">{pub.year}</span>}
            {pub.citations && <span class="pub-citations">{pub.citations} citações</span>}
          </div>
        ))}
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title">Formação Acadêmica</h2>
      <div class="edu-list">
        <div class="card edu-item">
          <h3>Mestrado em Administração</h3>
          <p class="edu-school">Must University — Estados Unidos</p>
        </div>
        <div class="card edu-item">
          <h3>Doctor Honoris Causa em Ciência da Computação</h3>
          <p class="edu-school">Hon.D.Sc.</p>
        </div>
        <div class="card edu-item">
          <h3>MBAs &amp; Especializações</h3>
          <p class="edu-school">Finanças, Projetos, Ciência de Dados, Docência</p>
        </div>
      </div>
    </section>
  </main>
</BaseLayout>

<style>
  .pub-list, .edu-list { display: flex; flex-direction: column; gap: 1rem; }
  .pub-card h3 { margin-bottom: 0.5rem; }
  .pub-venue { color: var(--text-secondary); margin-bottom: 0.5rem; }
  .pub-year, .pub-citations {
    display: inline-block;
    background: var(--bg-tertiary);
    color: var(--accent);
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
    margin-right: 0.5rem;
  }
  .edu-item h3 { margin-bottom: 0.3rem; }
  .edu-school { color: var(--text-secondary); }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectTimeline.astro src/components/CertificationCard.astro src/pages/portfolio.astro
git commit -m "feat: add portfolio page with timeline, certs, and publications"
```

---

### Task 5: Talks & Community Page

**Files:** `src/components/TalkCard.astro`, `src/components/GitHubLinks.astro`, `src/pages/talks.astro`

- [ ] **Step 1: Create TalkCard.astro**

```astro
---
interface Talk {
  title: string;
  event: string;
  year?: string;
  description?: string;
}

interface Props {
  talks: Talk[];
}

const { talks } = Astro.props;
---

<div class="talks-grid">
  {talks.map((talk) => (
    <div class="talk-card card">
      <h3>{talk.title}</h3>
      <p class="talk-event">{talk.event}</p>
      {talk.year && <span class="tag">{talk.year}</span>}
      {talk.description && <p class="talk-desc">{talk.description}</p>}
    </div>
  ))}
</div>

<style>
  .talks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  .talk-card h3 { margin-bottom: 0.5rem; }
  .talk-event { color: var(--accent); font-size: 0.9rem; margin-bottom: 0.5rem; }
  .talk-desc { color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem; }
</style>
```

- [ ] **Step 2: Create GitHubLinks.astro**

```astro
---
interface Repo {
  name: string;
  description: string;
  url: string;
  language: string;
}

const repos: Repo[] = [
  { name: 'nestjs-viacep', description: 'Módulo NestJS para consulta de endereços via ViaCep', url: 'https://github.com/claudioraposo/nestjs-viacep', language: 'TypeScript' },
  { name: 'nestjs-dataprotection', description: 'Proteção de dados sensíveis em objetos, alinhado à LGPD', url: 'https://github.com/claudioraposo/nestjs-dataprotection', language: 'TypeScript' },
  { name: 'nestjs-chatgpt', description: 'Serviço de geração de texto com OpenAI API', url: 'https://github.com/claudioraposo/nestjs-chatgpt', language: 'TypeScript' },
  { name: 'linkshare', description: 'Loja virtual TypeScript com e-commerce', url: 'https://github.com/claudioraposo/linkshare', language: 'TypeScript' },
  { name: 'gRPC', description: 'Microserviços comunicando-se via gRPC', url: 'https://github.com/claudioraposo/grpc', language: 'Go' },
];
---

<div class="repos-grid">
  {repos.map((repo) => (
    <a href={repo.url} target="_blank" rel="noopener" class="repo-card card">
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <span class="tag">{repo.language}</span>
    </a>
  ))}
</div>

<style>
  .repos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .repo-card { display: block; color: var(--text-primary); }
  .repo-card h3 { color: var(--accent); margin-bottom: 0.5rem; }
  .repo-card p { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; }
</style>
```

- [ ] **Step 3: Create talks.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TalkCard from '../components/TalkCard.astro';
import GitHubLinks from '../components/GitHubLinks.astro';

const talks = [
  { title: 'Plataformização de Arquitetura de Dados com Backstage.io e IAC', event: 'TDC Floripa', year: '2025' },
  { title: 'Eficiência na Nuvem com Developer Experience', event: 'Azure Floripa', year: '2024' },
  { title: 'Arquitetura Celular em Cloud Computing', event: 'RecDev Summit', year: '2024' },
  { title: 'Estratégias de Automação e DevOps em Multicloud', event: "The Developer's Conference (TDC)", year: '2023' },
  { title: 'LGPD e Conformidade em Cloud Computing', event: 'Conferência Acadêmica', year: '2023' },
];
---

<BaseLayout title="Palestras — Cláudio Raposo" currentPage="talks">
  <main>
    <section class="container section">
      <h2 class="section-title">Palestras &amp; Workshops</h2>
      <TalkCard talks={talks} />
    </section>

    <section class="container section">
      <h2 class="section-title">Comunidade &amp; Liderança</h2>
      <div class="community-list">
        <div class="card community-item">
          <h3>Microsoft MVP Community Lead</h3>
          <p>Eventos, meetups e treinamentos sobre Microsoft, cloud e desenvolvimento.</p>
        </div>
        <div class="card community-item">
          <h3>Docker Captain</h3>
          <p>Referência global em containers, DevOps e automação.</p>
        </div>
        <div class="card community-item">
          <h3>The Developer's Conference (TDC)</h3>
          <p>Coordenador de trilhas de JavaScript, NodeJS e Arquitetura de Dados.</p>
        </div>
        <div class="card community-item">
          <h3>Escola da Nuvem</h3>
          <p>Mentor voluntário em cloud computing, promovendo inclusão e diversidade.</p>
        </div>
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title">Projetos Open Source</h2>
      <GitHubLinks />
    </section>
  </main>
</BaseLayout>

<style>
  .community-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .community-item h3 { color: var(--accent); margin-bottom: 0.5rem; }
  .community-item p { color: var(--text-secondary); }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TalkCard.astro src/components/GitHubLinks.astro src/pages/talks.astro
git commit -m "feat: add talks page with open source and community sections"
```

---

### Task 6: Blog Content Collection & Dynamic Post Pages

**Files:** `src/content/config.ts`, `src/content/blog/first-post.md`, `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Create src/content/config.ts**

```ts
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

- [ ] **Step 2: Create first blog post at src/content/blog/first-post.md**

```md
---
title: "Arquitetura Celular em Cloud Computing"
date: 2025-04-05
description: "Uma introdução à arquitetura celular e como ela resolve problemas de escalabilidade em ambientes cloud."
tags: ["cloud", "arquitetura", "kubernetes"]
---

## Introdução

Arquitetura celular é um padrão de design que organiza capacidades em células independentes. Cada célula é uma unidade autocontida capaz de executar todas as operações do sistema.

## Por que Arquitetura Celular?

Em ambientes cloud tradicionais, um banco de dados compartilhado ou um gargalo pode derrubar toda a aplicação. Com células, cada uma isola seus recursos:

- **Isolamento**: Falha em uma célula não afeta as demais
- **Escalabilidade horizontal**: Adicione células sob demanda
- **Deploy independente**: Atualize células individualmente

Na NTT DATA, implementamos esta abordagem com ganho de 30% em tempo de resposta.

## Implementação com AKS e EKS

Cada célula é um namespace ou cluster Kubernetes com:

1. Seu próprio banco de dados
2. Proxies sidecar para serviço de descoberta
3. Health checks independentes

## Conclusão

Arquitetura celular transforma sistemas monolíticos em sistemas resilientes. É o futuro da computação em nuvem para grandes volumes.
```

- [ ] **Step 3: Create src/pages/blog/[...slug].astro**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

const post = Astro.props;
const { Content } = await post.render();
const { title, date, description, tags } = post.data;
---

<BaseLayout title={`${title} — Blog`} currentPage="blog">
  <main class="container section">
    <article>
      <header class="post-header">
        <a href="/blog" class="back-link">&larr; Voltar ao Blog</a>
        <h1>{title}</h1>
        <time class="post-date">{date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        {description && <p class="post-description">{description}</p>}
        {