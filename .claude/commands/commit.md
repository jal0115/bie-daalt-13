---
description: Generate Conventional Commits message for Personal Task Tracker
---

# /commit

`git status` ба `git diff --cached`-ыг уншаад commit message санал болгох.

## Format
## Type-ууд

| type | Хэрэглээ | Жишээ |
|------|----------|-------|
| `feat` | Шинэ feature | feat(tasks): add filter by priority |
| `fix` | Bug засвар | fix(repository): prevent SQL injection in search |
| `docs` | Зөвхөн документ | docs(api): add OpenAPI spec |
| `test` | Test нэмэх | test(tasks): add 10 unit tests for service |
| `refactor` | Behavior өөрчлөгдөхгүй refactor | refactor(service): extract validation helper |
| `chore` | Build, dep, config | chore: update express to 4.22.1 |
| `style` | Format, whitespace (logic биш) | style: fix indentation |

## Project-ийн scope-ууд

`tasks`, `repository`, `service`, `controller`, `routes`, `validation`, `middleware`, `db`, `api`, `partA`, `partB`, `partC`, `tests`, `docs`, `ci`

## Жишээнүүд

### Шинэ feature нэмсэн бол:
test(tasks): add 10 unit tests for service layer with mocked repository
Service-ийн бүх 5 method-ыг тестлэв.
Repository-г jest.unstable_mockModule-аар mock хийсэн.
Edge case: NotFoundError, statusCode 404.
Co-Authored-By: Claude noreply@anthropic.com

## Дүрэм

- AI ашиглагдсан бол **заавал** `Co-Authored-By:` нэмэх
- Subject line **imperative** voice ("add" биш "added")
- 72 char-аас давсан тохиолдолд body нэмэх
- Олон асуудлыг **нэг commit-д** бүү багтаа
- Bullet point-уудыг body-д ашигла
