---
description: OWASP Top 10 (2021) security audit
---

# /security

OWASP Top 10 (2021) шалгуурын дагуу одоогийн codebase-ийг шалгана.

## OWASP Top 10 (2021) checklist

### A01: Broken Access Control
- [ ] Endpoint бүр зөв permission check-тэй
- [ ] User өөрийн биш resource-д хүрч чадахгүй (e.g., GET /tasks/:id зөвхөн өөрийн хийсэн)
- [ ] CORS зөв тохируулагдсан (`*` биш тодорхой origin)
- [ ] Rate limiting endpoint-уудад

### A02: Cryptographic Failures
- [ ] Password hash хадгалагдсан (bcrypt, argon2)
- [ ] HTTPS-ээр л sensitive data илгээгддэг
- [ ] JWT secret тогтмол биш, env-ээс ирдэг
- [ ] Хадгаласан data зөв encrypt хийгдсэн (хэрэгтэй бол)

### A03: Injection
- [ ] SQL — prepared statement бүх query-д
- [ ] Command injection — `child_process.exec` user input ашигладаггүй
- [ ] NoSQL injection (хэрэгтэй бол) — query operator escape
- [ ] LDAP, ORM injection шалгасан

### A04: Insecure Design
- [ ] Threat model хийсэн (PROJECT.md-д товч)
- [ ] Business logic flaw (negative quantity, double-spend гэх мэт) тохиолдолд unit test
- [ ] Default-аар secure (deny by default, allow explicit)

### A05: Security Misconfiguration
- [ ] Helmet middleware идэвхтэй
- [ ] Default password / sample data production-д үлдээгээгүй
- [ ] Error message stack trace user-т гардаггүй (production)
- [ ] Unused features off

### A06: Vulnerable Components
- [ ] `npm audit` ажиллуулсан, high/critical 0
- [ ] `package.json` lock хийгдсэн
- [ ] Outdated dep шинэчлэх төлөвлөгөөтэй

### A07: Identification and Authentication Failures
- [ ] Session fixation хамгаалалт (нэвтэрсний дараа session ID өөрчлөгдөх)
- [ ] Brute force-аас rate limit + delay
- [ ] Password requirement тогтоосон (min length гэх мэт)

### A08: Software and Data Integrity Failures
- [ ] CI/CD-ийн integrity (signed commit, lock file in repo)
- [ ] Insecure deserialization (eval, JSON.parse user input attribute) байхгүй

### A09: Security Logging and Monitoring Failures
- [ ] Auth fail, error 5xx логд бичигддэг
- [ ] PII (password, token) лог руу гарч байгаа эсэх шалгасан

### A10: Server-Side Request Forgery (SSRF)
- [ ] User-supplied URL-ээр request явуулдаг бол allowlist-тай (хэрэгтэй бол)

## Output формат

```
## Severity: HIGH
- A03 SQLi эрсдэл: src/repositories/tasks.repository.js:42
  - `db.exec("DELETE FROM tasks WHERE id=" + id)` ← raw concat
  - Засвар: prepared stmt: `db.prepare('DELETE FROM tasks WHERE id = ?').run(id)`

## Severity: MEDIUM
- A05 Helmet middleware ашиглаагүй: src/app.js
  - app.use(helmet()) нэмэх

## Severity: LOW
- ...

## Pass
- A01: route auth middleware байна ✓
- A02: bcrypt cost factor 10 ✓
```

## Хэлэх нэмэлт

`npm audit` болон `npm outdated` command-уудыг ажиллуулсан тохиолдолд тэдгээрийн output-ыг хавсралт болгож үзүүл.
