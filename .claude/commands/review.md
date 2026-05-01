---
description: Security + robustness review of code changes (Lec12 + OWASP)
---

# /review

Та энэ файл эсвэл өөрчлөлтийг security + robustness үүднээс шалгана.

## Шалгах зүйлс

### Security (Lec12 + OWASP Top 10)
1. **Input validation** — бүх user input zod schema-аар шалгагдсан уу?
2. **SQL injection** — prepared statement үү, эсвэл string concat үү?
3. **Authentication/Authorization** — endpoint бүр зөв permission-той юу?
4. **Sensitive data exposure** — error message-д stack trace, password, token гарч байна уу?
5. **Rate limiting** — abuse-ийг хязгаарлах middleware байна уу?
6. **CORS** — wildcard `*` биш, тодорхой origin зөвшөөрөгдсөн үү?
7. **Helmet headers** — CSP, X-Frame-Options гэх мэт орсон уу?

### Robustness
1. **Error handling** — async function-ууд try/catch-тэй эсвэл `next(err)`-тэй юу?
2. **Edge case** — null, undefined, empty array, very long string-ийг хэрхэн боловсруулдаг вэ?
3. **Race condition** — concurrent request-д зөв ажиллах уу?
4. **Resource leak** — DB connection, file handle хаагдаж байна уу?
5. **Type coercion bug** — JS-ийн `==` биш `===` хэрэглэгдсэн үү?

## Output формат

Дараах форматтай гарга:

```
## ✅ Сайн зүйлс
- ...

## ⚠️ Зөвлөмж (severity: low/medium/high)

### [HIGH] Title
- **Файл:** src/...
- **Шугам:** ...
- **Асуудал:** ...
- **Санал:** ...
- **Жишээ код:**
```js
// Засаж болох жишээ
```
```

## Хязгаарлалт

- Зөвхөн санал — autofix хийхгүй
- Хүн review хийсний дараа л apply
- False positive байж болохыг анхааруул
