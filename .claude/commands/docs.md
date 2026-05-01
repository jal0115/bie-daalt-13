---
description: Generate JSDoc and README sections for the given module
---

# /docs

Сонгосон файл / module-д JSDoc болон README хэсэг үүсгэх.

## JSDoc стандарт

```js
/**
 * <Нэг өгүүлбэрээр функцийн зорилго.>
 *
 * <Дэлгэрэнгүй (заавал биш). Юу хийдэг, ямар edge case-тэй.>
 *
 * @param {<type>} <name> - <тайлбар>
 * @returns {<type>} <тайлбар>
 * @throws {<ErrorType>} <ямар үед>
 *
 * @example
 * const task = createTask({ title: 'Buy milk' });
 * // → { id: 1, title: 'Buy milk', status: 'todo', ... }
 */
```

## Дүрэм

- Бүх public function-д JSDoc
- Internal helper-д товч (нэг мөр) хүрэлцэх
- `@param` дугаар параметртэй адил
- `@returns void` бичих хэрэггүй
- `@throws`-ийг л зориуд throw хийдэг функцэд оруул

## README хэсгийн загвар

```markdown
## <Module нэр>

<2-3 өгүүлбэрээр зорилго.>

### Public API

| Function | Тайлбар |
|----------|---------|
| `createTask(data)` | Шинэ task үүсгэнэ |
| `findTasks(filter)` | filter-ийн дагуу хайна |

### Жишээ

```js
import { TaskService } from './services/tasks.service.js';

const svc = new TaskService(repo);
const t = svc.createTask({ title: 'Hello', priority: 'high' });
```

### Дотоод тайлбар (хэрэгтэй бол)

- ... 
```

## Доорх төрлийн файлд тус бүрд нь

| Файл | Юу нэмэх |
|------|----------|
| `routes/*.js` | endpoint-уудын товч жагсаалт OpenAPI хэсгээр |
| `services/*.js` | Public method JSDoc + business rule тайлбар |
| `repositories/*.js` | Method JSDoc + SQL коммент |
| `validation/*.js` | Schema-ний тайлбар (зүүлт болгон) |

## Output

JSDoc-ийг шууд код доторх patch болгож үзүүл.
README хэсгийг markdown снiппет болгож үзүүл — оюутан өөрөө `partB/README.md`-д залгана.
