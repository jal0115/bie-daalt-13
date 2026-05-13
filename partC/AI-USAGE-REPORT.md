# AI Usage Report - Personal Task Tracker

**Developer:** Luvsanjal
**Date:** 2026-05-06
**Project:** Personal Task Tracker (Node.js + Express + SQLite)
**AI Tool:** Claude (Anthropic)

> Энэ файлд бичсэн зүйл бүхэн миний өөрийн ажигласан, шалгасан туршлага. Build хийх явцад тэмдэглэж аваад дараа нь Report болгож нэгтгэв.

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### А хэсэг (Plan)

**AI хийсэн:**
- 3 stack-ийн (Node.js, Python FastAPI, Go) харьцуулалтын бичвэрийн анхны draft
- ARCHITECTURE.md дотор Mermaid diagram-ийн анхны загвар (layered flow, sequence diagram)
- PROJECT.md, STACK-COMPARISON.md template

**Өөрөө хийсэн:**
- Эцсийн stack сонголт: Node.js + Express + SQLite (хичээлийн стектэй уялдсан)
- Scope-ыг 5 feature-ээс 4-т багасгах шийдвэр (tag many-to-many цаг шаардсан)
- Дараа нь deadline шахмал учир 4-ээс 3 feature болгож хасах (status workflow хасав)
- ADR-001-ийг өөрөө уншиж, "яагаад Go биш Node.js" гэдгийг тайлбарлаж сурсан
- ARCHITECTURE.md уншсаны дараа Layered Architecture-ийн 4 layer-ийг (Routes Controller Service Repository) ойлгож, Separation of Concerns зарчмыг сурсан

### Б хэсэг (Build)

**AI хийсэн:**
- Express app.js, server.js skeleton
- better-sqlite3-ийн connection файл (db/index.js)
- migrations.sql дотор tasks хүснэгтийн CHECK constraint, index
- zod validation schema (4 schema)
- Repository layer-ийн prepared statements
- Service layer-ийн NotFoundError class
- Controller бүгд (try/catch + next(err) pattern)
- Routes mapping
- Error middleware (ZodError + custom statusCode)
- 10 unit test (jest.unstable_mockModule pattern)
- OpenAPI 3.0 yaml специfication

**Өөрөө хийсэн:**
- npm install хийсэн ба гарсан хувилбарын асуудлыг (Express 5 vs 4) илрүүлж зассан
- Encoding asuudal илрүүлж засах (Notepad ANSI vs UTF-8)
- API endpoint бүрийг Invoke-RestMethod-аар тестлэсэн (POST, GET, PATCH, DELETE, validation, 404)
- Git commit бүрийг өөрөө хийж Conventional Commits format-аар бичсэн
- 5 өөр өдөрт жигдлэн ажилласан (Day 1-5)

---

## 2. Hallucination ба алдааны жишээ

### Жишээ 1: Express хувилбарын зөрчил

**Контекст:** ARCHITECTURE.md, ADR-001 хоёрт Express 4 сонгох гэж бичсэн. npm install express ажиллуулсан.

**Болсон зүйл:** package.json дотор "express": "^5.2.1" гэж бичигдсэн. npm нь default-аар хамгийн шинэ хувилбарыг (Express 5) суулгасан.

**Учир:** Express 5 нь 2024 онд stable болсон шинэхэн хувилбар. Middleware compatibility бүрэн шалгагдаагүй. AI документад "Express 4" гэж бичсэн ч install command-аар тодорхой хувилбар хэлээгүй.

**Хэрхэн илэрсэн:** package.json-ыг шалгахдаа ^5.2.1 гэж байгааг харсан. ADR-001 уншсан учир "5 биш 4 байх ёстой" гэж мэдсэн.

**Засвар:**
- npm uninstall express
- npm install express@4
- Эцсийн хувилбар: 4.22.1

**Сургамж:** Хувилбар сонгохдоо package@version гэж тодорхой бичих ёстой. Документад заасан хувилбартай install command нь таарч байх ёстой.

### Жишээ 2: Notepad encoding asuudal (2 удаа давтагдсан)

**Контекст:** package.json-д "author" талбарт өөрийн нэрийг Кириллээр бичих. Дараа нь db/index.js дотор Кирилл comment бичих.

**Болсон зүйл:**
- "author": "Лувсанжал" болж "author": "Ð›ÑƒÐ²ÑÐ°Ð½Ð¶Ð°Ð»"
- // Database файлын зам болж // Database Ñ„Ð°Ð¹Ð»Ñ‹Ð½ Ð·Ð°Ð¼

**Учир:** Windows Notepad нь default-аар ANSI encoding ашигладаг (UTF-8 биш). Кирилл бичсэн файлыг хадгалахад тарж байсан.

**Хэрхэн илэрсэн:** Get-Content -Encoding UTF8 командаар файлын агуулгыг шалгасан үед "Ð›ÑƒÐ²ÑÐ°Ð½Ð¶Ð°Ð»" гэж байсан.

**Засвар:** PowerShell-ийн Set-Content -Encoding UTF8 параметр ашиглах. Эсвэл код доторх comment-уудыг англиар бичих стандартыг дагах.

**Сургамж:** Code-ын стандарт comment англиар байх нь зөв (олон улсын стандарт). Encoding asuudal-аас зайлсхийнэ. Notepad биш VS Code эсвэл PowerShell heredoc ашиглах.

### Жишээ 3: PowerShell-д curl quote escaping

**Контекст:** Эхний task үүсгэхэд curl ашигласан: curl.exe -X POST -H "Content-Type: application/json" -d single-quote бүхий JSON.

**Болсон зүйл:** Server-ээс "Unterminated string in JSON at position 14" алдаа буцаасан.

**Учир:** PowerShell нь single quote дотор backslash-quote-ыг literal гэж үздэг. Bash-ээс өөр. JSON body зөв escape хийгдээгүй учир server-т буруу string ирсэн.

**Хэрхэн илэрсэн:** API server алдаа буцаасан учир. Error middleware "Unterminated string in JSON" гэж тодорхой хариу буцаасан нь шалгахад тус болсон.

**Засвар:** PowerShell-ийн native command Invoke-RestMethod ашиглах. ConvertTo-Json-аар hash table-аас JSON болгох.

**Сургамж:** Платформ бүрд arг өөр. Bash дээр curl ашиглахад зөв ч PowerShell-д Invoke-RestMethod илүү найдвартай.

---

## 3. Security ба license-ийн анхаарал

### SQL injection эрсдэл - Repository layer-д

**Контекст:** Search endpoint бичих үед AI санал болгосон хувилбар нь template literal дотор user input шууд оруулсан query байсан.

**Эрсдэл:** Template literal-аар user input шууд SQL-д орох нь SQL injection-д өртөмтгий. Жишээ нь хортой хэрэглэгч "; DROP TABLE tasks; --" гэх мэт оруулга өгч DB сүйтгэх боломжтой.

**Засвар:** Prepared statement-ийг зөв ашиглах - ? placeholder + параметрийг тусад нь .all() методэд дамжуулах. Энэ хэлбэрээр SQL engine query-ийг нэг удаа compile хийгээд параметрийг "data only" гэж үздэг. Injection боломжгүй.

**Хэрхэн илэрсэн:** /security болон /review slash command-уудыг ашиглан Repository layer-ийг шалгасан.

### npm deprecation warnings

**Контекст:** npm install express better-sqlite3 zod helmet cors ажиллуулсны дараа 4 warning гарсан:
- prebuild-install@7.1.3 (no longer maintained)
- inflight@1.0.6 (memory leak risk)
- glob@7.2.3 (security vulnerabilities)
- glob@10.5.0

**Эрсдэл:** Эдгээр нь dependency-уудын dependency (transitive). Шууд засах боломжгүй - гол пакетуудын maintainer-ууд update хийх ёстой.

**Шийдвэр:** Audit-аас 0 critical vulnerability гарсан учир үргэлжлүүлсэн. Production deployment-д нэмэлт audit хэрэгтэй.

### .gitignore-ийн template алдаа

**Контекст:** Template-аар үүссэн .gitignore-д package-lock.json ignore хийгдсэн байсан.

**Эрсдэл:** Бусад developer (эсвэл багш) repo-ыг clone хийгээд npm install ажиллуулахад өөр хувилбарын package суух магадтай. Dependency reproducibility алдагдана.

**Засвар:** .gitignore-аас package-lock.json хасав. Одоо git-д track хийгдэж байгаа.

---

## 4. AI-аар хурдан хийсэн зүйлс (Productivity benefit)

1. Express + SQLite skeleton setup - npm init, dependencies, folder structure, эхний app.js болон server.js: дунджаар 2-3 цагийн ажил 30 минут хүрсэн.

2. 5 файлын layered architecture (validation, repository, service, controller, routes) - AI боломжтой жишээгүйгээр санах боломжгүй pattern. 2 цаг хэмнэгдсэн.

3. Mermaid diagram syntax - flowchart, sequenceDiagram, erDiagram. Гар аргаар ASCII зурахаас илүү цэвэр, мэргэжлийн дүр.

4. OpenAPI 3.0 yaml - 253 мөр. Үлгэр өгөөгүй бол яаж эхлэхээ мэдэхгүй format. AI үлгэрээр заасан.

5. Zod schema-ууд - 4 schema (create, update, query, idParam). Validation logic нэг газар төвлөрсөн.

6. Test edge cases санах - empty input, very long string, special chars, boundary numbers. AI санал болгосноор тест 10 хүрсэн.

7. Conventional Commits format - feat/fix/docs/test/refactor/chore prefix-ийн ялгаа. Олон commit message-ийг хурдан зөв format-аар бичсэн.

Нийт хэмнэгдсэн цаг: 6-8 цаг минимум.

---

## 5. AI-аар удаан хийсэн зүйлс (Бэрхшээл)

1. Express 5 vs 4 асуудал - AI документад "Express 4" гэж бичсэн ч install command тодорхойгүй байсан учир Express 5 суусан. Илрүүлж засах 30 минут алдсан.

2. Notepad encoding asuudal - 2 удаа давтагдсан. Эхэндээ "юу болсон" гэдгийг ойлгоход цаг алдсан. AI-аас "ANSI vs UTF-8" гэдгийг сурахад нэмэлт 20 минут.

3. PowerShell vs Bash command - Linux/Mac-д ашиглах ёстой command-ыг AI санал болгох тал бий. Windows-д ажиллахгүйг үе шатлан илрүүлэх. 15 минут.

4. Бизнес шийдвэр - "Tag-ыг хийх үү?", "Status workflow хийх үү?" гэх мэт scope шийдвэрийг AI санал болгож чадахгүй. Time constraint-ыг өөрөө шийдэх ёстой.

5. Контекст алдагдах - Урт session-д AI өмнөх шийдвэрээ "мартсан" мэт байх тал бий. CLAUDE.md дотор convention тодорхой бичсэн нь нөхөв.

---

## 6. Skill atrophy эрсдэлийг хэрхэн зохицуулсан

AI боломжтой бол хувийн ур чадвар муудах эрсдэлтэй. Миний хэрэгжүүлсэн арга хэмжээ:

### Кодоо тайлбарлах дадал
AI үүсгэсэн файл бүрийг уншиж, "энэ юу хийдэг вэ?" гэж өөрөөсөө асуудаг байлаа. Жишээ нь:
- ARCHITECTURE.md уншсаны дараа layered architecture-ийг өөрөөрөө тайлбарлаж сурсан: Routes Controller Service Repository DB.
- Repository layer-ийн prepared statements-ийг яагаад хэрэгтэйг тайлбарлаж сурсан (SQL injection-аас хамгаалал, performance).
- Service layer ба Controller layer-ийн ялгааг ойлгож сурсан.

### Шалгалтын дасгал
Build-ийн явцад AI надаас асуултууд асуудаг байсан:
- "Хэдэн layer бий?"
- "Яагаад Go биш Node.js сонгосон вэ?"
- "Express 5 биш 4 яагаад вэ?"
- "SQL injection гэж юу вэ, яаж хамгаалсан?"

Эдгээрт өөрөөрөө хариулж сурсан нь шалгалтын бэлтгэл болсон.

### Commit бүрд "тайлбарлах хорго"
Commit хийхийн өмнө 2-3 минут зарцуулж "энэ commit-д юу өөрчилсөн вэ?" гэж тэмдэглэдэг байсан. Conventional Commits format нь тус болсон.

### Бодит туршилт хийх
API endpoint бүрийг Invoke-RestMethod-аар жинхэнэ тестэлсэн:
- POST: task үүсгэгдэв (id=3, id=4)
- PATCH: priority high low шилжсэн
- GET filter: priority=high ажилласан
- Validation: priority=urgent 400 алдаа
- 404: GET /api/tasks/999 "Task with id 999 not found"

**Үнэн хариу:** Skill atrophy-ийн эрсдэл бий. Жишээ нь regular expression, encoding subtleties зэргийг AI-аар бичүүлдэг болсон. Ирээдүйд эдгээрийг гар аргаар бичих дасгал хийх төлөвлөгөөтэй. Гэхдээ архитектурын ойлголт, layered design, SQL safety зэргийг бат хадгалж чадсан гэж итгэдэг.

---

## Дүгнэлт

AI бол multiplier - байгаа ур чадварыг үржүүлдэг боловч мэдлэгийг орлодоггүй. Энэ бие даалт нь надад "Verify, don't trust" зарчмыг практикт сурахад тусалсан.

**Хамгийн чухал сургамж:**
1. AI хариу бүрийг уншиж шалгах - Express 5 vs 4 жишээ үүнийг харуулсан
2. Cross-platform difference мэдэх - PowerShell vs Bash
3. Дэвшилтэт алхмууд хийх - encoding, dependency version, security шалгалт
4. Бид кодлогчийн "бичих" үүргээс "дизайн, верификаци" руу шилжиж байна - энэ нь ирээдүйн ажлын чиглэл

Энэ туршлагаар би одоо AI-тай ажиллахад илүү шүүмжлэлтэй, асууж сурсан developer болж байна.

- Лувсанжал, 2026-05-06

Үг тоо: 1600+
