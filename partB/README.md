# Part B — Build (Personal Task Tracker)

REST API for managing personal tasks. Node.js + Express + SQLite.

## Quick start

```bash
npm install
npm start                    # http://localhost:3000
```

## Scripts

| Script | Тайлбар |
|--------|---------|
| `npm start` | Production-аар ажиллуулна |
| `npm run dev` | Nodemon, file change-д restart |
| `npm test` | Бүх unit + integration test |
| `npm run test:watch` | Test watch mode |
| `npm run lint` | ESLint |
| `npm run lint:fix` | Auto-fix lint |

## Folder бүтэц

```
src/
├── app.js                # Express app (test-д import)
├── server.js             # listen() entry point
├── db/
│   ├── index.js          # better-sqlite3 connection
│   └── migrations.sql    # CREATE TABLE
├── routes/
│   └── tasks.routes.js
├── controllers/
│   └── tasks.controller.js
├── services/
│   └── tasks.service.js
├── repositories/
│   └── tasks.repository.js
├── validation/
│   └── tasks.schema.js
└── middleware/
    ├── error.middleware.js
    └── validate.middleware.js
tests/
├── tasks.service.test.js
├── tasks.repository.test.js
└── tasks.api.test.js
```

## API

OpenAPI 3.0 spec — `openapi.yaml`-ыг үзнэ үү.

### Endpoint summary

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | `/health` | Liveness |
| GET | `/api/tasks` | List + filter (status, priority, tag, q) |
| GET | `/api/tasks/:id` | Single task |
| POST | `/api/tasks` | Create |
| PATCH | `/api/tasks/:id` | Update |
| DELETE | `/api/tasks/:id` | Delete |

### Жишээ

```bash
# Create
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Read book","priority":"high","tags":["learning"]}'

# Filter
curl "http://localhost:3000/api/tasks?status=todo&priority=high"

# Update
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'
```

## Тест

```bash
npm test                # Бүгд
npm run test:coverage   # Coverage report
```

10+ unit test, эхний commit-аас эхэлж нэмэгдсэн (Git history харна уу).

## AI ашиглалт

- Custom slash commands `.claude/commands/`-д
- Build-ийн чухал session-ууд `ai-sessions/`-д
- Дэлгэрэнгүйг `partC/AI-USAGE-REPORT.md`-аас үзнэ үү

## Лиценз

Курсийн зорилгоор. Production-д ашиглах биш.
