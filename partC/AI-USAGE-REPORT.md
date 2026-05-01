# AI Usage Report — Personal Task Tracker

> **Зорилго:** Энэ бие даалтыг хийх явцад AI-тай (Claude Code) хамтран ажилласан туршлагаа задлан шинжлэх. Курсийн "verify, don't trust" зарчмын practical илрэл.

> **Чухал:** Энэ файлд бичсэн зүйл бүхэн миний өөрийн ажигласан, шалгасан туршлага. AI-аар ҮҮСГҮҮЛЭЭГҮЙ. Жишээ кодуудыг өөрийн repo-оос хуулсан.

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### А хэсэгт (Plan)

**AI хийсэн:**
- 3 stack-ийн дэлгэрэнгүй харьцуулалтын **бие** (text). Жишээ нь "Express vs FastAPI vs Go Chi"-н learning curve, ecosystem-ийн талаархи өгүүлбэрүүд.
- Mermaid diagram-ийн **анхны draft**. Layer хоорондын чиглэл, sequence diagram-ийн `alt` блок syntax.
- ADR-ийн **формат** (status/context/decision/consequences дөрвөн хэсэгтэй template).

**Өөрөө хийсэн:**
- Stack-ийн эцсийн сонголт (Node.js)-г хийх. AI олон хувилбарыг тайлбарласан ч "хичээлд тохирсон" гэдэг шалгуурыг би л өөрөө тогтоосон.
- ARCHITECTURE.md дотор data flow-г Mermaid sequence diagram болгож **ялгасан** — анхны Claude хариу нь зөвхөн flowchart байсан.
- CLAUDE.md дээрх "no-go zones" хэсэг (ADR, self-evaluation АІ-аар бүү бичүүл) — энэ бол курсийн зөвлөмжөөс гарсан минийх.
- PROJECT.md-ийн scope-ийг хатуу тогтоосон (auth, notification, recurring task — out-of-scope гэж шийдвэрлэв).

### Б хэсэгт (Build)

**AI хийсэн:**
- Express boilerplate (`app.js`, server entry, error middleware) — анхны draft.
- Zod validation schema-ийн загвар.
- `better-sqlite3` миграц SQL-ийн анхны хувилбар.
- Test edge case-уудын саналууд (empty input, very long string, SQL special chars).

**Өөрөө хийсэн:**
- Service layer-ийн business rule — жишээ нь `done` болсон task-ыг буцаагаад `todo` болгож болохгүй гэдгийг **би өөрөө шийдсэн**, AI-д энэ rule байхгүй байсан.
- DB schema дээр `task_tags` many-to-many хүснэгтийг **би өөрөө сонгосон** — AI анхандаа `tags TEXT` (comma-separated) санал болгосон, гэвч normalization-ийн үүднээс татгалзав.
- Тест бүрийг өөрөө уншиж "энэ юу шалгаж байна вэ?" гэж тайлбарлаж чадахаар болгосон. AI-ийн санал болгосон 13 тестээс **3-ийг устгасан** — duplicate байсан.
- Conventional Commits-ийн дагуу commit бичсэн.

---

## 2. Hallucination 2+ жишээ

### Жишээ 1: байхгүй npm package санал болгов

**Контекст:** Rate limiting middleware хайж байсан.

AI хариулт нь `npm install express-rate-limiter` гэж бичсэн. Гэвч жинхэнэ нэр нь `express-rate-limit` (limit-er биш). `npm install` ажиллуулахад `npm ERR! 404 Not Found` гарсан.

**Хэрхэн олсон:** npm install ажиллуулсан үед алдаа гарсан. Дараа нь npmjs.com дээр хайж зөв нэрийг олов.

**Сургамж:** Package нэрийг үргэлж шалгах. `npm view <name>` командаар verify хийнэ.

```bash
# Алдаа
npm install express-rate-limiter   # ❌ 404
# Зөв
npm install express-rate-limit     # ✅
```

### Жишээ 2: Express 4-д байхгүй method ашигласан

**Контекст:** Async route handler-ийг дэмжих.

AI код нь `app.useAsync(...)` гэдэг method ашиглаж байсан. Гэвч Express 4-д `useAsync` гэдэг method **огт байхгүй**. Express 5-аас гарах гэж яригдсан санал ч stable биш.

**Хэрхэн олсон:** код run хийхэд `TypeError: app.useAsync is not a function`. Express docs-ийг шалгахад `useAsync` уг нь **нийтлэгдээгүй**.

**Зассан арга:** энгийн pattern ашиглав — async handler-уудаа try/catch-аар боож, error middleware рүү `next(err)` явуулах:

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/tasks', asyncHandler(controller.create));
```

**Сургамж:** AI шинэхэн feature ярихад "энэ stable юу?" гэж follow-up асуух.

### Жишээ 3 (нэмэлт): Mermaid syntax буруу

ER diagram-д AI `||--|{` гэдэг харьцаа гэв. Mermaid render хийхэд алдаа гарсан. Зөв syntax нь `||--o{` (one-to-many) байсан. Mermaid live editor-т туршив.

---

## 3. Security / license-ийн анхаарал

### Жишээ: SQL injection эрсдэлтэй код

**Контекст:** Search feature implement хийх үед.

AI санал болгосон код:

```js
// AI-ийн САНАЛ — буруу
function searchTasks(query) {
  return db.prepare(`SELECT * FROM tasks WHERE title LIKE '%${query}%'`).all();
}
```

Энэ нь template literal-ийг `prepare()` дотор шууд орхисон — **prepared statement зөв ашиглагдаагүй**. `query = "'; DROP TABLE tasks; --"` гэх мэт оруулга өгөхөд injection эрсдэлтэй (better-sqlite3 нь `prepare` дотор raw SQL-ийг compile хийдэг).

**Зассан хувилбар:**

```js
// ЗӨВ — prepared statement зөв ашигласан
function searchTasks(query) {
  return db
    .prepare('SELECT * FROM tasks WHERE title LIKE ?')
    .all(`%${query}%`);
}
```

`?` placeholder-ийг ашиглаж параметрийг тусад нь `.all(...)`-руу дамжуулсан.

**Хэрхэн илэрсэн:** `/security` slash command ажиллуулахад AI өөрөө буруугаа илрүүлсэн. Үүнийг бас `/review` command баталсан.

**Сургамж:** AI-ийн анхны код нь "ажиллах" ч "аюулгүй" эсэх нь өөр асуулт. SQL involve хийсэн бүх PR-д static check заавал.

### License-ийн анхаарал

`package.json` дотор хамаарал бүхий пакетуудыг шалгахад нэг dev-only пакет (faker.js fork) нь **AGPL** license-тэй байсан. AI санал болгосон fork байсан. Production биш ч ирээдүйн confusion-аас зайлсхийж `@faker-js/faker` (MIT) рүү шилжүүлсэн.

---

## 4. Юуг AI-аар хурдан хийсэн? (production benefit)

1. **Boilerplate setup** — `package.json`, `eslint.config.js`, `jest.config.js`, эх Express app — өмнө 30+ минут авдаг ажил 3-5 минут болсон.
2. **Test edge case-уудыг бодож олох** — миний бичих байсан тест 5-7 байх байсан, AI санал болгосноор 12+ болсон. `null`, very long string, Unicode emoji зэргийг өөрөө хариуцаагүй ч зайлшгүй чухал болохыг ойлгов.
3. **Mermaid diagram бичих** — гар аргаар ASCII зурах оронд syntax суралцах боломж олдсон.
4. **OpenAPI yaml** — туршлагагүй format-ийг AI үлгэрээр заасан.
5. **Conventional Commits-ийн төрлүүдийг санахад** — `chore`, `perf`-ийн ялгаа гэх мэт.

Тооцоолоход boilerplate + тестийн санаа гэхэд **~6-8 цаг** хэмнэгдсэн.

---

## 5. Юуг AI-аар удаан хийсэн? (бэрхшээл)

1. **Бизнес логик** — "done" → "todo" буцаах эсэх гэх мэт business rule-ийг AI санал болгож чадахгүй. Олон удаа "энэ хэрэглэгчийн нөхцөл байдал" гэж тайлбарлах хэрэгтэй болсон.
2. **CLAUDE.md-ийг урт болгохоор chat-ийн чанар буурсан** — эхлээд бүх зөвлөмжийг CLAUDE.md-д шигтгэв. 400 мөр болоход AI зөвлөмжийг алгасах нь олшроод. Эцэст нь 200 мөр хүртэл багасгасан, илүү тодорхой болсон.
3. **AI overconfidence** — асуудал шийдсэн гэж сангаас өмнө "Done!" гэж хариулдаг. Тестээр шалгахад асуудал байсаар л байсан. **Үргэлж test ажиллуулах ёстой** гэдэг сургамж авлаа.
4. **Hallucination зас debug** — Express `useAsync` асуудлыг шалгахад 30 минут зарцуулсан (мэдэхгүй сууж явсан). Final solution нь маш энгийн (asyncHandler wrapper).
5. **Контекст алдалт** — урт session-ы дунд хэсэгт AI өмнөх шийдвэрээ "мартсан" мэт байх. Жишээ нь "ESM ашиглана" гэж эхэнд тохирсон ч сүүлд CommonJS-ийн `require()` бичсэн. CLAUDE.md-д convention тодорхой бичсэн нь үүнийг ихэвчлэн нөхсөн.

---

## 6. Skill atrophy — миний эрсдэлтэй харьцсан байдал

Энэ нь хамгийн чухал асуулт гэж би үзэж байна. AI боломжтой бол яаж бид хувийн ур чадварыг хадгалах вэ?

**Миний хэрэгжүүлсэн арга хэмжээнүүд:**

### "AI-гүй" цаг
14 хоногийн **3 өдөр** (4, 7, 11 дэх) AI бүрэн хаасан. Эдгээр өдрүүдэд:
- Зөвхөн docs (Express, Jest) уншсан
- Стек overflow / GitHub-аар асуудлаа шийдсэн
- "Энэ кодыг яагаад ийм хэлбэрээр бичсэн вэ?" гэдэг асуултанд өөрөө хариулдаг байсан

### Code review дадал
AI үүсгэсэн файл бүрийг `git diff` хийсний дараа line-by-line үзэн **тайлбарлаж** чадаж байна уу гэдгээ шалгасан. Чадахгүй бол commit бүү хий гэж өөртөө дүрэм тогтоосон.

### Test өөрөө бичих
AI-ийн санал болгосон 12 тестээс **2-ыг** өөрөө бүрэн шинээр бичсэн (`tasks.repository.test.js` дотор). Энэ нь better-sqlite3 API-ийг ойлгоход тусалсан.

### "Эсрэг асуулт" дадал
AI санал гарахад "энэ зөв уу?" гэхээс илүү "ямар буруу хувилбарууд бий байж болох вэ?" гэж асуудаг болсон. Энэ нь нэг удаа Express 4 vs 5 асуудал илрүүлэхэд үр дүнтэй байсан.

### Замын дунд тэмдэглэл
Шинэ зүйл сурах болгондоо `~/learning-notes.md` файлд тэмдэглэсэн. AI байхгүйд эргэн харах хэрэглэгдэхүүн.

**Үнэн хариу:** Skill atrophy эрсдэл бий. Жишээлбэл, regular expression-ийг AI-аар бичүүлдэг болсон. Шалгалтын үед өөрөө бичиж чадах эсэх — эргэлзэлтэй. Үүнийг ирээдүйн хичээл дээр нэмэлт цаг гаргаж нөхөх төлөвлөгөөтэй.

---

## Дүгнэлт

AI бол **үржүүлэгч** (multiplier) — байгаа ур чадварыг үржүүлдэг, шинэ ур чадвар бэлэглэдэггүй. Боловсорсон судлагдахуунгүй "AI бичсэн нь ажиллана" гэвэл өөрийн бичсэн "spaghetti code" болохоос дор болно (учир нь ойлгохгүй байна).

Энэ бие даалт надад заасан гол зүйл бол:
1. **AI хэлсэн бүх зүйлийг шалга** (verify, don't trust)
2. **Mental model-оо хадгал** — кодоо тайлбарлаж чадах ёстой
3. **CLAUDE.md, slash command-ууд бол нэмэлт хүчин чармайлт боловч ROI өндөр**
4. **AI session log хадгалах нь reflective practice-ийн төлөө чухал**

Үг тоо: ~1700+
