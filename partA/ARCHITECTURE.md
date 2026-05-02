# ARCHITECTURE.md — Personal Task Tracker

## Layer-н архитектур

Систем нь **layered architecture**-аар бүтэцлэгдсэн. Layer бүр зөвхөн доод layer-ээ дуудана.

```mermaid
flowchart TB
    Client[HTTP Client<br/>curl / browser / Postman]

    subgraph Express["Express App"]
        Mid[Middleware<br/>helmet, cors, json, rate-limit]
        Routes[Routes Layer<br/>tasks.routes.js]
        Ctrl[Controllers Layer<br/>tasks.controller.js]
        Svc[Services Layer<br/>tasks.service.js]
        Repo[Repository Layer<br/>tasks.repository.js]
        ErrMid[Error Middleware<br/>error.middleware.js]
    end

    DB[(SQLite<br/>data/tasks.db)]

    Client -->|HTTP| Mid
    Mid --> Routes
    Routes --> Ctrl
    Ctrl --> Svc
    Svc --> Repo
    Repo -->|prepared statements| DB
    Ctrl -.->|throw| ErrMid
    ErrMid -->|JSON error| Client
```

## Module-уудын тайлбар

| Layer | File | Үүрэг |
|-------|------|-------|
| **Routes** | `routes/tasks.routes.js` | URL → controller mapping. Validation schema холбох. |
| **Controller** | `controllers/tasks.controller.js` | HTTP req/res handling. Service дуудаад response буцаах. |
| **Service** | `services/tasks.service.js` | Business logic. Жишээ: status transition rule. |
| **Repository** | `repositories/tasks.repository.js` | SQL query, DB-тэй ярих ганц layer. |
| **Validation** | `validation/tasks.schema.js` | Zod schema — request body, query шалгах. |
| **DB** | `db/index.js` | better-sqlite3 connection, migration. |
| **Middleware** | `middleware/error.middleware.js` | Global error handler, 404, validation error format. |
| **Server** | `app.js`, `server.js` | Express setup ба listen хийх (тестийн төлөө хуваасан). |

## Data flow жишээ — `POST /api/tasks`

```mermaid
sequenceDiagram
    participant C as Client
    participant R as Route
    participant V as Validator
    participant Ctrl as Controller
    participant S as Service
    participant Re as Repository
    participant DB as SQLite

    C->>R: POST /api/tasks {title, priority}
    R->>V: validate(body, taskSchema)
    alt Invalid
        V-->>C: 400 {error: "title required"}
    else Valid
        V->>Ctrl: req.body парсэгдсэн
        Ctrl->>S: createTask(data)
        S->>S: business rule (default values)
        S->>Re: insert(task)
        Re->>DB: INSERT INTO tasks ... (prepared stmt)
        DB-->>Re: lastInsertRowid
        Re-->>S: created task
        S-->>Ctrl: task object
        Ctrl-->>C: 201 {data: task}
    end
```

## Data model

```mermaid
erDiagram
    TASKS {
        int id PK
        string title
        string description
        string status "todo|in_progress|done"
        string priority "low|medium|high"
        datetime due_date
        datetime created_at
        datetime updated_at
    }
```

## Folder бүтэц (partB/)

```
partB/
├── src/
│   ├── app.js                     # Express app үүсгэх (test-д import)
│   ├── server.js                  # listen() хийх entry point
│   ├── db/
│   │   ├── index.js               # connection
│   │   └── migrations.sql         # schema
│   ├── routes/
│   │   └── tasks.routes.js
│   ├── controllers/
│   │   └── tasks.controller.js
│   ├── services/
│   │   └── tasks.service.js
│   ├── repositories/
│   │   └── tasks.repository.js
│   ├── validation/
│   │   └── tasks.schema.js
│   └── middleware/
│       ├── error.middleware.js
│       └── validate.middleware.js
├── tests/
│   ├── tasks.service.test.js
│   ├── tasks.repository.test.js
│   └── tasks.api.test.js          # supertest-ээр integration
├── package.json
├── openapi.yaml
└── README.md
```

## Дизайны зарчмууд

1. **Single Responsibility** — Layer бүр нэг үүрэгтэй.
2. **Dependency direction** — Доош л чиглэнэ. Repository нь Service-ийг мэдэхгүй.
3. **Testable** — Service-ийг repository mock-той тестлэх боломжтой.
4. **No leaky abstraction** — Controller SQL мэдэхгүй, Repository HTTP мэдэхгүй.
