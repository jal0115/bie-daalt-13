# Personal Task Tracker (Draft README — Part A)

> Энэ нь A хэсгийн draft README. Build хэсэгт `partB/README.md` дотор бүрэн хувилбар бий болно.

## Зорилго

Хувийн ажлын даалгаврыг бүртгэх, хайх, шүүх REST API.

## Stack

- Node.js 20+, Express 4
- SQLite (better-sqlite3)
- Jest + supertest (тест)
- zod (validation)

## Build

```bash
cd partB
npm install
```

## Run

```bash
npm start
# http://localhost:3000
```

## Test

```bash
npm test
```

## API Endpoints (төлөвлөсөн)

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | `/api/tasks` | Бүх task (filter, search дэмжинэ) |
| GET | `/api/tasks/:id` | Нэг task |
| POST | `/api/tasks` | Шинэ task үүсгэх |
| PATCH | `/api/tasks/:id` | Зарим талбар засах |
| DELETE | `/api/tasks/:id` | Устгах |
| GET | `/api/tags` | Tag-уудын жагсаалт |
| GET | `/health` | Liveness probe |

## Бүтэц

`partA/ARCHITECTURE.md`-ийг үзнэ үү.
