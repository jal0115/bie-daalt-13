# CLAUDE.md

> Claude Code-д өгөх context. Repo-д ажиллах бүх AI session энэ файлыг уншина.

## Project context

**Personal Task Tracker** — REST API + minimal frontend.
Хэрэглэгч task үүсгэх, засах, устгах, хайх, шүүх боломжтой.

- **Stack:** Node.js 20+, Express 4, SQLite (better-sqlite3), Jest
- **Layer:** Routes → Controllers → Services → Repository → DB
- **Goal:** Маш олон feature биш, цэвэрхэн архитектур + сайн тест

## Build / Test commands

```bash
cd partB
npm install              # Анхны setup
npm start                # Production (port 3000)
npm run dev              # Nodemon-той dev
npm test                 # Бүх unit test
npm run test:watch       # Watch mode
npm run lint             # ESLint
npm run lint:fix         # Auto-fix
```

## Coding conventions

- **Module формат:** ES modules (import/export), CommonJS биш
- **Async pattern:** async/await, callback биш
- **Error handling:** Express error middleware, try/catch route-д бичихгүй
- **Response shape:** `{ data, error }` форматтай JSON
- **Validation:** `zod` ашиглах (express-validator биш)
- **DB:** prepared statement заавал, raw string concat болохгүй (SQLi)
- **Naming:** camelCase JS-д, snake_case DB column-д
- **File limit:** Нэг файл ≤200 мөр, том бол хуваа

## Conventional Commits

Бүх commit дараах форматтай:
```
<type>(<scope>): <short summary>

<optional body>

Co-Authored-By: Claude <noreply@anthropic.com>   # AI ашигласан бол
```

`type`: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `style`

## No-go zones (AI бүү хийгээрэй)

- `partA/adr/` — ADR-уудыг АІ ганцаар бичихгүй, оюутан review хийнэ
- `partC/SELF-EVALUATION.md` — заавал хүний бичсэн байх
- `partC/AI-USAGE-REPORT.md` — оюутан өөрөө бичсэн туршлага байх ёстой
- Production secrets, API key — code-д бүү бич, `.env` ашигла
- `node_modules/`, `coverage/`, `*.db` — git-д commit хийхгүй

## Testing rules

- Unit test ≥10. Integration test нэмбэл бүр сайн.
- Edge case заавал багтаа: empty input, very long string, SQL special char, Unicode
- AI үүсгэсэн тест бүрд хүн review хийсэн байх
- Test name: `describe('TaskService', () => { it('should ...', ...) })`

## Security checklist (Lec12)

- [ ] Input validation бүх endpoint-д
- [ ] SQL injection-аас prepared statement-аар хамгаалах
- [ ] CORS зөв тохируулах
- [ ] Rate limiting (express-rate-limit)
- [ ] Helmet middleware
- [ ] Error message-д stack trace гаргахгүй (production)

## AI session log журам

Чухал session бүрийг `partB/ai-sessions/NN-сэдэв.md` файлд хадгал:
- Огноо, зорилго
- Гол асуулт хариултын товч
- AI юу буруу санал болгосон (hallucination)
- Эцсийн шийдвэр
