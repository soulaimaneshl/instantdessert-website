# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Code Quality Standards

- **DRY** — no duplication; extract shared logic once it appears twice
- **SRP** — each module/function/component has one responsibility
- **KISS** — choose the simplest solution that works
- **SOLID** — apply all five principles; favour composition over inheritance
- **YAGNI** — implement only what is needed now, never speculative features
- No hacks, workarounds, or temporary fixes — fix root causes
- Prefer the most maintainable solution over the clever one

## Architecture

- Clean architecture: strict separation between domain logic, application services, and infrastructure/UI layers
- Dependencies point inward; outer layers depend on inner layers, never the reverse

## Git Workflow

- `main` branch is always clean and deployable
- Every change happens on a dedicated feature branch
- Commit on each meaningful modification with a clear, descriptive message
- Never push broken code to `main`; merge only via PR after verification

## UX/UI

- Use the `ux-ui-pro-max` skill for all interface design decisions
