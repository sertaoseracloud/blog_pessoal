# Design do Portfólio Pessoal

## Estrutura Proposta
1. **Cabeçal**: Nome, cargo (Éssico Architect & Professor), e links para redes sociais
2. **Sobre**: Resumo profissional destacando arquitetura de software, cloud computing e educação
3. **Certificações**: Lista detalhada (AWS, Microsoft, Docker, etc.) com ícones visuais
4. **Publicações Científicas**: Tabela com artigos de Qualis A2, áticas, links para Google Scholar
5. **Palestras e Workshops**: Eventos recentes (TDC, Astro, etc.) e temas abordados
6. **Blog**: Integração de posts em Markdown
7. **GitHub e Contato**: Links para repositórios open source e formulário de contato

## Design Visual
- Tema escuro com contraste em elementos técnicos (ex: código em fundo Claro)
- Ícones SVG para certificações e eventos
- Layout responsivo enavigação clara

## Especificações Técnicas
- Frameworks: AstroJS (recomendado)
- Blog: Posts no formato Markdown no diretório /posts
- Deploy: GitHub Pages com CI/CD via GitHub Actions

## Valiadação
- Foco em 5+ seções para refletir expertise multidimensional
- Acessibilidade e performance otimizada
- Reutilizabilidade de componentes (ex: cartão de certificação)