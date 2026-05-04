# AI Session 01 — Setup and CRUD Implementation

**Огноо:** 2026-05-04 (Day 4)
**Үргэлжлэн:** ~5 цаг
**Зорилго:** partB skeleton, Task CRUD endpoints

---

## Хийсэн ажил

1. npm setup (Express, better-sqlite3, zod, helmet, cors, jest, supertest, nodemon)
2. Folder бүтэц: src/{db,routes,controllers,services,repositories,validation,middleware}
3. DB schema (migrations.sql) - tasks хүснэгт, indexes
4. db/index.js - better-sqlite3 connection, WAL mode
5. error.middleware.js - 404 ба global error handler
6. app.js, server.js - Express skeleton
7. validation/tasks.schema.js - 4 zod schema (create, update, query, idParam)
8. repositories/tasks.repository.js - 5 функц (create, findById, findAll, update, remove)
9. services/tasks.service.js - business logic + NotFoundError class
10. controllers/tasks.controller.js - 5 HTTP handler
11. routes/tasks.routes.js - URL → controller mapping
12. app.js шинэчлэх - tasksRoutes холбох

---

## Гол асуултууд ба сурсан зүйлс

### Q1: Express 4 vs 5 - аль нь сонгох вэ?

**Шинж чанар:** ADR-001-д Express 4 сонгох гэж бичсэн ч `npm install express` нь default-аар Express 5 суусан.

**Шийдэл:**
- npm uninstall express
- npm install express@4
- Эцсийн хувилбар: 4.22.1

**Сургамж:** Хувилбар сонгохдоо `package@version` гэж тодорхой бичих.

### Q2: ES modules-д __dirname ашиглах

**Асуудал:** ES modules-д `__dirname` global байхгүй (CommonJS-аас өөр).

**Шийдэл:**
```javascript
curl.exe -d '{"title":"Read book"}'
PowerShell дээр зөв ажиллаагүй - `Unterminated string in JSON` алдаа.

**Шийдэл:** PowerShell-д `Invoke-RestMethod` ашиглах:
```powershell
$body = @{ title = "Read book" } | ConvertTo-Json
Invoke-RestMethod -Uri "..." -Body $body
```

**Сургамж:** Платформын хувьд arг өөр байдаг. Bash дээр curl, PowerShell дээр Invoke-RestMethod.

### Алдаа 2: .gitignore-д package-lock.json (template алдаа)
**Гарсан асуудал:** Анхны .gitignore-д `package-lock.json` ignore хийсэн байсан.

**Учир ОЛДВОР:** Энэ нь best practice биш - dependency reproducibility-ийн төлөө lock файлыг git-д хадгалах ёстой.

**Шийдэл:** .gitignore-аас хасав. package-lock.json одоо track хийгдэж байна.

### Алдаа 3: Notepad encoding asuudal
**Гарсан асуудал:** Notepad нь default ANSI encoding ашиглана. Кирилл comment "Лувсанжал" → "Ð›ÑƒÐ²ÑÐ°Ð½Ð¶Ð°Ð»".

**Шийдэл:** PowerShell `Set-Content -Encoding UTF8` ашиглах. Эсвэл comment-уудыг англиар бичих.

**Сургамж:** Кирилл текст бичихэд encoding шалгах ёстой.

---

## API endpoints (бэлэн)

| Method | Path | Status | Body schema |
|--------|------|--------|-------------|
| POST | /api/tasks | 201 | createTaskSchema |
| GET | /api/tasks | 200 | (query: q, priority) |
| GET | /api/tasks/:id | 200 | - |
| PATCH | /api/tasks/:id | 200 | updateTaskSchema |
| DELETE | /api/tasks/:id | 204 | - |

Алдаа:
- 400 - Validation failed (zod)
- 404 - Task not found (NotFoundError)
- 500 - Internal server error

---

## Тест хийсэн жишээнүүд

POST: успех - id=3, id=4 task үүсгэгдсэн
PATCH: priority high → low шилжүүлсэн
GET filter: ?priority=high зөв ажилласан
Validation: priority="urgent" → 400 алдаа
404: GET /api/tasks/999 → "Task with id 999 not found"

Бүх endpoint амжилттай ажилласан.

---

## Дараагийн алхам (Day 5)

1. 10+ unit test (Service ба Repository)
2. OpenAPI 3.0 spec (yaml)
3. README дуусгах
4. Slash commands өөрөө бичих
