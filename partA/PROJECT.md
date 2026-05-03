# PROJECT.md — Personal Task Tracker

## Сэдэв

**Personal Task Tracker** — Хувийн ажлын даалгавар (task)-ыг бүртгэх, шүүх, засварлах REST API.

## Зорилго

Хэрэглэгч өдөр тутмын ажлуудаа цэгцтэй хадгалах, эрэмбэлэх, эцсийн хугацааг хянах боломжтой backend систем.

## Scope (хийгдэх ажлууд)

### MVP feature-ууд
1. **Task CRUD** — үүсгэх, унших (нэг ба бүгд), засах, устгах
2. **Due date & priority** — заавал биш талбар, default `medium`
3. **Search & Filter** — title-аар хайх, status/priority-аар шүүх

### Out of scope (хийхгүй)
- Олон хэрэглэгчийн систем (auth, user account)
- Notification (email, push)
- Frontend SPA (зөвхөн статик HTML form, optional)
- File attachment
- Recurring task
- Status workflow (`todo` → `in_progress` → `done` шилжилт)

## Acceptance criteria

- [ ] Бүх CRUD endpoint OpenAPI spec-тэй
- [ ] Validation алдаа `400` буцаана, бусад тохиолдолд зөв status code
- [ ] SQLite файл `data/tasks.db`-д үүснэ
- [ ] `npm test` бүх unit test pass болно (≥10)
- [ ] `npm start` ажиллахад server `http://localhost:3000` дээр асна

## Хэрэглэгчийн жишээ flow

```
1. POST   /api/tasks          → шинэ task үүсгэх
2. GET    /api/tasks?priority=high
                              → яаралтай задачуудаа авах
3. PATCH  /api/tasks/:id      → task-ийн title эсвэл due_date засах
4. DELETE /api/tasks/:id      → task устгах
```

## Хугацаа

2 долоо хоног (14 хоног). А хэсэг 3 хоног, Б хэсэг 8 хоног, В хэсэг 3 хоног.
