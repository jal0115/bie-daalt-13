# ADR-0002: Express 4 vs Express 5 хувилбар сонгох шийдвэр

- **Status:** Accepted
- **Date:** 2026-05-04 (Day 4 - Build setup)
- **Deciders:** Luvsanjal
- **Context:** Personal Task Tracker, npm install setup

## Context

partB-ийн setup-ийн үед npm install express ажиллуулсан. Гэвч ARCHITECTURE.md болон ADR-001-д Express 4 сонгох гэж бичсэн байсан. Үр дүн дээр npm нь default-аар Express 5.2.1 суулгасан.

Энэ нь чухал шийдвэрийн зөрчил - документ ба бодит код хооронд incompatibility үүсгэв.

## Decision

**Express 4.22.1**-ийг сонгож Express 5-ыг устгав:
npm uninstall express
npm install express@4
## Consequences

### Эерэг

- Документтай (ADR-001, ARCHITECTURE.md, STACK-COMPARISON.md) бодит код таарна
- Express 4 нь production-д тогтвортой ажилладаг (10+ жил)
- Middleware ecosystem (helmet, cors, express-rate-limit) бүгд compat
- AI training data Express 4-д их учир hallucination бага

### Сөрөг

- Express 5-ийн зарим шинэ feature (built-in async error handling) хэрэглэх боломжгүй
- Ирээдүйд Express 5 рүү migrate хийх ажил үлдэнэ
- npm warning-ууд (deprecated transitive deps) их

## Alternatives considered

| Хувилбар | Эерэг | Сөрөг | Шийдвэр |
|----------|-------|-------|---------|
| Express 5 (npm-ийн default) | Шинэ feature, async handling | Middleware compat хүндрэлтэй | ❌ |
| Express 4.22.1 | Тогтвортой, бүх middleware compat | Шинэ feature байхгүй | ✅ |
| Fastify (өөр framework) | Илүү хурдан | Курсийн стек биш | ❌ |

## AI-тай ярилцлагын товч

Эхэндээ AI Express 5-ийг "шинэхэн, илүү сайн" гэж санал болгосон. Гэвч follow-up асуулт "production-д тогтвортой уу?" гэхэд middleware compatibility бүрэн шалгагдаагүй гэдгийг хүлээн зөвшөөрсөн.

Шийдвэр: Документад заасан хувилбарыг (Express 4) дагах. npm install хийхдээ заавал `package@version` гэж тодорхой бичих гэдэг сургамж аввав.

## Implementation

`package.json` дотор:"express": "^4.22.1"
Энэ commit-аас хойш бүх install command-д хувилбар тодорхой бичсэн.

## Ref

- ADR-0001 (Stack сонголт - Node.js + Express)
- STACK-COMPARISON.md (Express 4 vs 5 харьцуулалт)
- partB/ai-sessions/01-setup-and-crud.md (Express 4 vs 5 session)
