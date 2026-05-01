---
description: Generate a Conventional Commits message for staged changes
---

# /commit

`git status` ба `git diff --cached` уншаад Conventional Commits формат бүхий commit message санал болгох.

## Format

```
<type>(<scope>): <short summary, ≤72 chars, imperative>

<optional body — юу/яагаад өөрчилснийг тайлбарлах>

<optional footer — BREAKING CHANGE: ..., refs #issue>

Co-Authored-By: Claude <noreply@anthropic.com>   # AI ашиглагдсан commit-д л
```

## Type-ууд

| type | Хэрэглээ |
|------|----------|
| `feat` | Шинэ feature |
| `fix` | Bug засвар |
| `docs` | Зөвхөн документ өөрчлөлт |
| `test` | Тест нэмэх / засах |
| `refactor` | Behavior өөрчлөгдөхгүй refactor |
| `style` | Format, whitespace (logic биш) |
| `chore` | Build, dep, configuration |
| `perf` | Performance сайжруулалт |

## Scope-ийн жишээ

`tasks`, `tags`, `db`, `api`, `validation`, `tests`, `docs`, `ci`

## Жишээнүүд

```
feat(tasks): add filter by status and priority

Query параметр (status, priority) дэмжлээ.
Validation хийсэн — буруу утгад 400 буцаана.

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
fix(db): prevent SQL injection in search query

`title LIKE` параметрийг prepared statement-д шилжүүллээ.
Өмнө нь raw string concat байсан.

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
test(tasks.service): cover edge cases for createTask

Empty title, very long title (1001 chars), special chars-ийг
тестлэв. 5 шинэ тест нэмэгдэв.
```

## Дүрэм

- AI ашигласан commit-д **заавал** `Co-Authored-By:` нэм
- 100% хүний бичсэн commit-д Co-Authored-By **бүү бич**
- Subject line imperative voice ("add" биш "added", "adds" биш)
- 72 char-аас давсан тохиолдолд body-д тайлбар нэм
- Bullet point-уудыг body-д ашигла, олон асуудлыг нэг commit-д бүү багтаа
