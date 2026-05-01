# AI Planning Session — товч лог

> Энэ нь Plan хэсгийн AI-тай хийсэн чатын товчилсон хувилбар.
> Бодит чатын хэсгүүдийг ӨӨРИЙН Claude Code session-аас хуулж тэмдэглэнэ үү.

## Session 1 — Stack харьцуулалт

**Огноо:** 2026-05-01
**Үргэлжилсэн:** ~25 минут
**Зорилго:** 3 stack-ийн plus/minus харьцуулж 1-ийг сонгох

### Гол асуултууд ба хариунд

**Q1:** "Personal task tracker REST API-д Node.js + Express, Python + FastAPI, Go + Chi гурвыг харьцуулж өгөөч. 2 долоо хоногийн оюутны проект."

**A1 (товч):** AI 3 stack-ийн ecosystem, learning curve, AI hallucination risk-ийг харьцуулсан. Node.js-ийг surface area хамгийн их, FastAPI-ийг автомат OpenAPI-ийн төлөө, Go-ийг performance-ийн төлөө сайн гэв.

**Миний шийдвэр:** Node.js — курсийн стектэй уялдсан.

---

**Q2:** "Express 4 vs Express 5 vs Fastify — production-д аль нь зохистой вэ?"

**A2 (товч):** Express 5 шинэхэн (2024-ний эцэст stable), middleware compat сайжирсан. Fastify нь performance илүү, schema-driven. Express 4 хамгийн стейбл.

**⚠️ Hallucination сэжиг:** AI Express 5-ийн зарим feature нь Express 4-д ч ажилладаг гэж хэлсэн. Шалгахад буруу — `app.router` API өөр болсон. Тэмдэглэв.

**Миний шийдвэр:** Express 4.19+ — стабильный, бүх middleware compat.

---

**Q3:** "better-sqlite3 vs sqlite3 vs Prisma — анхан шатанд зохистой?"

**A3 (товч):**
- `sqlite3` callback-based, legacy
- `better-sqlite3` synchronous, хамгийн хурдан, debug хялбар
- Prisma — ORM, migrations гайхалтай ч setup ажил

**Миний шийдвэр:** `better-sqlite3` — sync API нь test simple, no migration tool overhead.

---

## Session 2 — Architecture зураг

**Огноо:** 2026-05-02
**Зорилго:** Layer-ийн зургийг Mermaid-аар бий болгох

### Гол асуултууд

**Q1:** "Жижиг REST API-д Routes/Controllers/Services/Repository 4 layer хэт олон уу?"

**A1:** AI хэлэхдээ "жижиг проектод 2-3 layer хангалттай байж болно" гэв. Гэвч сурах зорилгоор 4 layer-ийг сонгов. Service layer-ийг business logic-д ашиглана.

**Q2:** "Mermaid sequenceDiagram дотор alt block яаж бичих вэ?"

**A2:** AI зөв syntax өгсөн, шалгахад ажиллав.

---

## Session 3 — CLAUDE.md дизайн

**Огноо:** 2026-05-02
**Зорилго:** Repo-ийн root-д сайн CLAUDE.md үүсгэх

### Тэмдэглэл

- AI хэдэн yet-completed feature-ыг "no-go zone" гэж бичсэн (ADR-уудыг ганцаар бичихгүй гэх мэт). Энэ заавал хүний зүйл байх ёстой учир хадгаллаа.
- AI санал болгосон "no production secrets in code" гэдэг security checklist-ийг шууд хүлээн авав.
- 200 мөрийн limit-ийг өөрөө нэмэв (Lec13 зөвлөмж).

---

## Хадгалах ёстой нэг сургамж

> AI-аас "energetically agree" хариулт ирвэл (бүх юм гайхалтай гэх) сэжиглэх. 2-3 follow-up асуулт асуухад буруу зүйл олдох тал бий.

Жишээ: Express 5 талаар асуухад анхны хариулт хэт оптимист байсан. "Production-д бэлэн уу?" гэж асуухад л middleware compatibility issue-уудыг дурдсан.
