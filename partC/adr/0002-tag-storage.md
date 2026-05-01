# ADR-0002: Tag-уудыг many-to-many хүснэгтээр хадгалах

- **Status:** Accepted
- **Date:** 2026-05-08 (build-ийн 7 дахь өдөр)
- **Deciders:** [Таны нэр]
- **Context:** Personal Task Tracker, Tag feature

## Context

Task бүрд олон tag (label) хавсаргах хэрэгтэй. Жишээ: "Buy milk" task-д `["shopping", "urgent"]` tag.

3 хувилбар судаллаа:

1. **Inline JSON column** — `tasks.tags TEXT` дотор `["shopping","urgent"]` гэсэн JSON
2. **Comma-separated TEXT** — `tasks.tags TEXT` дотор `"shopping,urgent"`
3. **Many-to-many** — `tags`, `task_tags` хүснэгтүүд нэмэх

AI эхлээд (2)-ыг санал болгосон ("хамгийн энгийн" гэж).

## Decision

**(3) — Many-to-many** хувилбарыг сонгов:

```sql
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE task_tags (
  task_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (task_id, tag_id),
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

## Consequences

### Эерэг
- ✅ Tag-аар хайх query энгийн (`JOIN`)
- ✅ Tag-ийн нэр өөрчлөгдсөн ч 1 update-ээр тарганаа
- ✅ Tag-ийн жагсаалтыг авах endpoint боломжтой (`GET /api/tags`)
- ✅ Normalized data — duplicate string алга

### Сөрөг
- ⚠️ `INSERT INTO task_tags` нэмэлт query — олон tag-тай task-д performance багавтар
- ⚠️ Code илүү (3 хүснэгт vs 1)
- ⚠️ Tag-ийн lifecycle бодох хэрэгтэй (tag delete хэзээ?)

## AI-тай ярилцлагын товч

**Чат:** `partB/ai-sessions/02-tag-storage-decision.md`-ыг үзнэ үү.

Гол солилцоонууд:

> **Би:** Эхний саналд `tags TEXT "shopping,urgent"` гэж хадгалах нь буруу гэж бодож байна — `WHERE tags LIKE '%urgent%'` хийвэл `"non-urgent"` ч таарна. Та юу гэж бодож байна?

> **AI:** Тийм ээ, маш зөв ажилласан санаа. Comma-separated арга нь `LIKE` query үед false match гаргадаг. Илүү найдвартай хувилбар нь `tags TEXT` дотор JSON array хадгалаад `json_each()` ашиглах юм уу, эсвэл many-to-many хүснэгт ашиглах.

> **Би:** SQLite-ийн `json_each` сайн ажилладаг гэж итгэхгүй байна — index-тэй ажиллах уу?

> **AI:** Зөв шүү. `json_each` нь generated column-той ашиглавал index-тэй ажиллах боловч setup нарийн. Many-to-many арга нь стандарт SQL-ийн дагуу хамгийн дотоод optimization-той.

Эцэст нь many-to-many арга сонгогдов.

## Alternatives considered

| Хувилбар | Сайн тал | Муу тал | Шийдвэр |
|----------|----------|---------|---------|
| Inline JSON | Setup хялбар | Index байхгүй, query удаан | ❌ |
| Comma-separated | Хамгийн энгийн | `LIKE` false match, normalize муу | ❌ |
| **M2M хүснэгт** | Стандарт, Index ажилладаг | Code илүү | ✅ |

## Implementation note

Tag delete-ийн lifecycle:
- Task устгахад `ON DELETE CASCADE`-аар task_tags автоматаар цэвэрлэгдэнэ
- Tag өөрөө орхигдсон (хэрэглэгчгүй болсон) бол **үлдээнэ** — хэрэглэгч дахин хэрэглэж магадгүй
- Future improvement: nightly cron `DELETE FROM tags WHERE id NOT IN (SELECT tag_id FROM task_tags)`
