# ADR-0001: Stack-ийн сонголт — Node.js + Express + SQLite

- **Status:** Accepted
- **Date:** 2026-05-02
- **Deciders:** [Лувсанжал]
- **Context:** Бие даалт 13, Personal Task Tracker

## Context

Personal Task Tracker REST API-г 2 долоо хоногийн дотор хийх ёстой. Stack нь:
- Курсийн хичээлд тохирсон,
- AI-тай хамтран ажиллахад тохиромжтой (training data их),
- Локалаар хурдан ажиллах,
- Тестлэхэд хялбар байх ёстой.

3 stack судалсан: Node.js + Express, Python + FastAPI, Go + Chi.

## Decision

**Node.js 20 + Express 4 + SQLite (better-sqlite3) + Jest + zod** -ийг сонгов.

## Consequences

### Эерэг
- ✅ Курсийн өмнөх лекцүүдтэй (Lec06-08) тэгшилтэй учир сурах хугацаа хэмнэгдэнэ.
- ✅ Express нь хамгийн их жишээтэй framework-уудын нэг тул AI hallucination бага.
- ✅ `better-sqlite3`-ийн sync API нь async/await-ийн нарийн дэс дарааллыг хялбарчлана.
- ✅ Jest + supertest-ээр HTTP layer-ийг бүтнээр нь тестлэх боломжтой.
- ✅ Setup хурдан — `npm install` + `npm start` хоёр л команд хэрэгтэй.

### Сөрөг
- ⚠️ TypeScript ашиглахгүй учир runtime-д type алдаа гарч болно. zod-оор runtime validation хийж нөхөв.
- ⚠️ OpenAPI spec-ийг гар аргаар (yaml файл) бичих хэрэгтэй. FastAPI-аас илүү ажил.
- ⚠️ Express 4 нь legacy callback хэв маяг ихтэй учир shape style consistency-д анхаарах хэрэгтэй.

## Alternatives considered

### Python + FastAPI
- ✅ pydantic auto OpenAPI
- ❌ Курсийн стек биш, venv нэмэлт setup
- ❌ Bie daalt 13 хугацаа богино учир stack солих эрсдэлтэй

### Go + Chi
- ✅ Performance, type safety
- ❌ Шинэ хэл — 2 долоо хоногт хангалтгүй
- ❌ AI hallucination Go дээр илүү (training data бага)

## Хэрэгжүүлэх жаягт

Build-ийн эхний commit нь:
```
chore: initial Node.js + Express + SQLite skeleton

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Ref

- `partA/STACK-COMPARISON.md` — нарийвчилсан харьцуулалт
- `partA/ai-sessions/plan.md` — AI-тай хийсэн харьцуулалтын чат
