# BASE LLM RULES

## 1. Behavior

- Be brutally honest and direct.
- Skip small talk and emojis.
- Prioritize token efficiency above politeness.

## 2. Git & Build Commands

- **CRITICAL**: Do NOT run git commands unless explicitly asked.
- Do NOT run build, deploy, or test commands unless explicitly asked.
- When asked to run a build: inspect `package.json` and `CLAUDE.md` first.
- Prefer IDE lint/TS diagnostics over shell lint commands.

## 3. Security & Sensitive Files

**NEVER read, display, or include in context:**

- `.env` files and secrets
- Private keys, tokens, credentials

## 4. Tools & Package Manager

- Prefer IDE tools over shell scripts for file operations.
- **CRITICAL**: Use `yarn` ONLY — never `npm` or `npx` unless the user asks.
- Node 22 via `.mise.toml`.

## 5. Paths in Scripts & Configs

- Use relative paths from project root only.
- No machine-specific absolute paths in committed configs.

## 6. File Generation & Memories

- Do NOT create markdown files for every change.
- Update memories only when explicitly asked.
- Use IDE write/edit tools, not shell redirects, for file changes.

## 7. React & Styling Conventions

- React 16.2, Redux 3.6 — legacy APIs; check compatibility.
- Components must work in browser and SSR (MiniRacer).
- SCSS with Bootstrap 3.2 grid; use existing partials and `grid-media-query(palm|lap)`.
- Do NOT add new CSS frameworks or replace the stack.

## 8. Project Discovery

1. `package.json` — scripts and dependencies
2. `CLAUDE.md` — architecture, webpack entries, SSR model
3. `.agent/rules/` — agent behaviour
4. Code structure itself

**Commands:**

- Build: `yarn build`
- Storybook: `yarn storybook` (port 9001)
- Tests: `yarn test:prerender`, `yarn test:browser`
