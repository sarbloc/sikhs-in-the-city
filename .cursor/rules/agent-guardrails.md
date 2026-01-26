# Agent Guardrails (always follow)

## Scope + PR size
- Work only on the assigned task.
- Max 6 files changed per PR.
- Keep changes small (~300 lines diff). If bigger, STOP and propose a split into another PR.
- No drive-by edits: do not modify unrelated code.

## No risky changes by default
- NO refactors, renames, mass formatting, or dependency upgrades unless explicitly requested.
- Do not touch auth/wallet/signing/keys/secrets code unless the task explicitly says so.

## Coding standards
- Follow existing patterns in the repo (Next.js/React/TypeScript conventions).
- Prefer adding tests over broad rewrites.

## Verification
Before finishing:
- `npm run lint` (or `next lint` if that’s what the repo uses)
- `npm run typecheck` (tsc --noEmit)
- `npm test` (vitest)
- If the task affects user flows: run `npm run e2e` (Playwright/Cypress)

## PR creation (when ready)
- Commit changes with a clear message.
- Push the branch.
- Open a PR targeting `main`.
- Include: summary, how to test, screenshots for UI changes, risks/notes.