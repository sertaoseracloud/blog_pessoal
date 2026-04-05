# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Run tests: `npm run test`
- Run single test: `npm run test -- --testPathPattern=src/components/Button.test.js`

## Architecture Overview
- Frontend: React-based UI in `src/frontend`
- Backend: Node.js API in `src/backend`
- State management: Redux Toolkit
- Testing: Jest + React Testing Library

## Important Notes
- Cursor rules: Check `.cursor/rules/` for custom development guidelines
- Copilot instructions: Review `.github/copilot-instructions.md` for AI assistant preferences
- README.md contains deployment instructions and API documentation

## Common Development Tasks
- Add new feature: Create component in `src/frontend/components`, update Redux slice
- Fix bug: Use `git bisect` to identify regression, write regression test
- Refactor: Follow existing patterns in `src/utils