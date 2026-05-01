# PROJECT.md — Personal Task Tracker

## Сэдэв

**Personal Task Tracker** — Хувийн ажлын даалгавар (task)-ыг бүртгэх, шүүх, засварлах REST API.

## Зорилго

Хэрэглэгч өдөр тутмын ажлуудаа цэгцтэй хадгалах, эрэмбэлэх, эцсийн хугацааг хянах боломжтой backend систем.

## Scope (хийгдэх ажлууд)

### MVP feature-ууд
1. **Task CRUD** — үүсгэх, унших (нэг ба бүгд), засах, устгах
2. **Due date & priority** — заавал биш талбар, default `medium`
3. **Label / Tag** — нэг task-д олон tag оноох (many-to-many)
4. **Search & Filter** — title-аар хайх, status/priority/tag-аар шүүх
5. **Status workflow** — `todo` → `in_progress` → `done`

### Out of scope (хийхгүй)
- Олон хэрэглэгчийн систем (auth, user account)
- Notification (email, push)
- Frontend SPA (зөвхөн статик HTML form, optional)
- File attachment
- Recurring task

## Acceptance criteria

- [ ] Бүх CRUD endpoint OpenAPI spec-тэй
- [ ] Validation алдаа `400` буцаана, бусад тохиолдолд зөв status code
- [ ] SQLite файл `data/tasks.db`-д үүснэ
- [ ] `npm test` бүх unit test pass болно (≥10)
- [ ] `npm start` ажиллахад server `http://localhost:3000` дээр асна

## Хэрэглэгчийн жишээ flow

```
1. POST   /api/tasks          → шинэ task үүсгэх
2. GET    /api/tasks?status=todo&priority=high
                              → яаралтай хийх ёстой задачуудаа авах
3. PATCH  /api/tasks/:id      → status-ыг "in_progress" болгох
4. PATCH  /api/tasks/:id      → status-ыг "done" болгох
5. DELETE /api/tasks/:id      → task устгах
```

## Хугацаа

2 долоо хоног (14 хоног). А хэсэг 3 хоног, Б хэсэг 8 хоног, В хэсэг 3 хоног.
