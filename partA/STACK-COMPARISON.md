# STACK-COMPARISON.md

Personal Task Tracker REST API-г бүтээхэд 3 stack-ийг харьцуулан үзэв.

## Харьцуулсан stack-ууд

| Шалгуур | **Node.js + Express** ✅ | Python + FastAPI | Go + Chi |
|---------|--------------------------|-------------------|----------|
| **Сурахад хялбар** | ⭐⭐⭐⭐⭐ JS-ийг хичээл дээр үзсэн | ⭐⭐⭐⭐ Python мэддэг ч async шинэ | ⭐⭐⭐ Шинэ хэл |
| **AI tooling support** | ⭐⭐⭐⭐⭐ Хамгийн их жишээ | ⭐⭐⭐⭐⭐ Sain | ⭐⭐⭐ Бага |
| **DB-тэй холбогдох хялбар байдал** | ⭐⭐⭐⭐ better-sqlite3 sync | ⭐⭐⭐⭐ SQLAlchemy | ⭐⭐⭐ database/sql |
| **Validation** | ⭐⭐⭐⭐ zod | ⭐⭐⭐⭐⭐ pydantic built-in | ⭐⭐⭐ go-playground/validator |
| **OpenAPI auto-gen** | ⭐⭐⭐ swagger-jsdoc | ⭐⭐⭐⭐⭐ автомат | ⭐⭐ гар |
| **Test ecosystem** | ⭐⭐⭐⭐ Jest + supertest | ⭐⭐⭐⭐ pytest | ⭐⭐⭐⭐ testing built-in |
| **Build/run хурд** | ⭐⭐⭐⭐ хурдан | ⭐⭐⭐⭐ хурдан | ⭐⭐⭐⭐⭐ compiled |
| **Production-д ашиглагдах байдал** | ⭐⭐⭐⭐⭐ маш өргөн | ⭐⭐⭐⭐ ургаж байгаа | ⭐⭐⭐⭐ backend-д сайн |
| **Файлын тоо ба setup** | багавтар | дунд | олон boilerplate |

## Stack 1 — Node.js + Express + SQLite

**Давуу:**
- JavaScript-ийг өмнөх лекцүүдэд (Lec06-08) сайн үзсэн.
- `npm` ecosystem асар том — middleware, helper олон.
- `better-sqlite3` synchronous API — debugging хялбар.
- Claude Code Express дээр маш сайн ажилладаг.

**Сул тал:**
- Validation болон OpenAPI-ийг гар аргаар холбох (zod + swagger-jsdoc).
- Type safety байхгүй (TypeScript оруулбал ажил нэмэгдэнэ).
- Async error handling-д анхаарал хэрэгтэй.

## Stack 2 — Python + FastAPI + SQLite

**Давуу:**
- pydantic-ийг ашиглан validation болон auto OpenAPI бий.
- Async support төрөлх.
- Уран зохиол маш баялаг.

**Сул тал:**
- Виртуал орчин (`venv`) тохируулах нэмэлт алхам.
- Курсийн хичээлд Node.js-ийг голчлон үзсэн тул хосгүй байх.
- SQLAlchemy эсвэл raw SQL хооронд шийдвэр гаргах хэрэгтэй.

## Stack 3 — Go + Chi + SQLite

**Давуу:**
- Compiled, өндөр performance.
- Type safety + concurrency built-in.
- Single binary deploy.

**Сул тал:**
- Шинэ хэл — 2 долоо хоногийн хугацаанд сурч байж бичих эрсдэлтэй.
- Boilerplate их (interface, struct тагтай гэх мэт).
- AI hallucination Go дээр илүү эрсдэлтэй (бага түгээмэл).

## ✅ Сонголт: **Node.js + Express + SQLite**

### Шалтгаан

1. **Хичээлийн тэгшилтэй** — Lec06-08 дээр Node.js, Express үзсэн тул шинэ хэл сурахад цаг үрэхгүй.
2. **AI hallucination бага** — Express-ийн training data маш их учраас Claude буруу дугнэх магадлал бага.
3. **Хурдан iteration** — `npm install`, `npm test` секундын хугацаанд ажиллана.
4. **Тестийн хэрэгсэл боловсорсон** — Jest + supertest combo нь route-ыг integration test хийхэд төгс.
5. **SQLite + better-sqlite3** нь sync API-тай учраас async/await complexity багасна. Файл-аас өөр infrastructure хэрэггүй.

### AI-тай хийсэн харьцуулалтын чат-ын товч

`partA/ai-sessions/plan.md` дотор бүрэн log байгаа. Гол асуултууд:
- "Жижиг REST API-д Node, Python, Go аль нь зохистой вэ?"
- "better-sqlite3 vs sqlite3 vs prisma — анхан шатанд аль нь сонгох вэ?"
- "Express 4 vs Express 5 vs Fastify — production-д аль нь зохимжтой вэ?"

AI Express 5-ийг санал болгосон. Гэвч Express 5 шинэхэн (2024-ний эцэст stable болсон) учраас middleware compatibility сайн шалгахгүй бол асуудал гарч магадгүй гэсэн санааг чат-д орууллаа. Эцэст нь **Express 4.19+** сонгов — stable, ecosystem нь бүрэн дэмжинэ.
