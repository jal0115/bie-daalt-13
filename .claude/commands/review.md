---
description: Security + robustness review for Personal Task Tracker code
---

# /review

Энэ command нь сонгосон файлыг security ба robustness үүднээс шалгана. Lec12 ба OWASP Top 10-ийн дагуу.

## Энэ project-д онцгойлж шалгах зүйлс

### Repository layer (tasks.repository.js)
- [ ] Бүх SQL query prepared statement-аар бичигдсэн үү?
- [ ] User input шууд SQL string-д орохгүй (LIKE pattern-д ч `?` ашиглах)
- [ ] db.exec() хэрэглэхгүй (миграц-аас бусад тохиолдолд)

### Service layer (tasks.service.js)
- [ ] NotFoundError class-ыг дагах нь — statusCode тогтоосон уу?
- [ ] Business rule зөв (жишээ: update-аас өмнө findById)
- [ ] Promise/async алдаа try/catch-аар барьсан уу?

### Controller layer (tasks.controller.js)
- [ ] Бүх async/sync error `next(err)`-аар middleware рүү дамжуулсан уу?
- [ ] zod schema-аар request body validate хийсэн үү?
- [ ] HTTP status code зөв (201 create, 200 read, 204 delete, 400/404 error)
- [ ] Response shape `{ data: ... }` стандарттай уу?

### Middleware (error.middleware.js)
- [ ] ZodError → 400 шалгасан уу?
- [ ] Custom error.statusCode → бүх status code дэмжсэн үү?
- [ ] Production-д stack trace гадагш гарахгүй

### App level (app.js)
- [ ] helmet() идэвхтэй
- [ ] cors() тохируулагдсан
- [ ] express.json() body parse хийдэг
- [ ] notFoundHandler ба errorHandler хамгийн сүүлд

## OWASP Top 10 шалгалт

- **A01 Broken Access Control:** Auth байхгүй (single-user app), Out-of-scope
- **A02 Crypto Failures:** Sensitive data байхгүй, OK
- **A03 Injection:** Prepared statements ✅
- **A04 Insecure Design:** Layered architecture ✅
- **A05 Misconfiguration:** Helmet, hide stack trace ✅
- **A06 Vulnerable Components:** `npm audit` ажиллуулах
- **A07 Auth Failures:** Out-of-scope
- **A08 Data Integrity:** Lock file тогтоосон ✅
- **A09 Logging:** console.error дотор бичигдэнэ
- **A10 SSRF:** Гадаад URL fetch байхгүй, OK

## Output формат

→ tasks.repository.js-ийг шалгана, 3 severity түвшнээр report буцаана.
