# Бие даалт 13 — AI-Assisted Software Construction

**Курс:** F.CSM311 Программ хангамжийн бүтээлт
**Сэдэв:** Personal Task Tracker (REST API)
**Stack:** Node.js + Express + SQLite
**AI хэрэгсэл:** Claude Code

## Бүтэц

- `partA/` — Plan: архитектур, stack харьцуулалт, ADR-001
- `partB/` — Build: эх код, тест, slash commands
- `partC/` — Reflect: AI Usage Report, ADR-002, self-evaluation
- `.claude/commands/` — Custom slash commands
- `CLAUDE.md` — AI-д өгөх context (build, conventions, no-go zones)

## Build / Run

Дэлгэрэнгүйг `partB/README.md`-ээс үзнэ үү.

```bash
cd partB
npm install
npm start        # API сервер ажиллана http://localhost:3000
npm test         # Unit test ажиллуулна
```

## Зохиогч

[Лувсанжал] — F.CSM311, 2026

## AI ашиглалт

Энэ проект Claude Code (Anthropic)-той хамтран хийгдсэн. Дэлгэрэнгүйг `partC/AI-USAGE-REPORT.md`-ээс үзнэ үү.
