---
description: Generate Jest unit tests with edge cases (testing pyramid)
---

# /test

Сонгосон функц / module-д Jest-ийн unit test үүсгэх.

## Зарчим — Testing pyramid

```
   /\
  /e2e\          ← цөөн (нэг ширхэг health check)
 /------\
/  api   \      ← дунд (supertest integration)
----------
   unit         ← олон (service, repository)
```

## Test үүсгэх дүрэм

1. **AAA pattern:** Arrange / Act / Assert
2. **Нэг test → нэг behavior** — олон assert байж болно гэхдээ нэг шинж чанарын тухай
3. **Test name:** `should <expected behavior> when <condition>`
4. **Edge case заавал багтаа:**
   - Empty input (`""`, `[]`, `null`, `undefined`)
   - Very long string (1000+ char)
   - Special chars (`'`, `"`, `;`, `--`, `\0`, emoji)
   - Boundary values (0, -1, MAX_INT)
   - Wrong type (string instead of number)
5. **Mock:** repository-ийг service test-д mock хийнэ
6. **Cleanup:** afterEach-д DB clear эсвэл restore

## Output формат

```js
import { describe, it, expect, beforeEach, vi } from 'vitest'; // эсвэл jest
import { TaskService } from '../src/services/tasks.service.js';

describe('TaskService.createTask', () => {
  let service;
  let mockRepo;

  beforeEach(() => {
    mockRepo = {
      insert: vi.fn(),
      findById: vi.fn(),
    };
    service = new TaskService(mockRepo);
  });

  it('should create task with default priority "medium" when priority not provided', () => {
    // Arrange
    mockRepo.insert.mockReturnValue({ id: 1, title: 'X', priority: 'medium' });
    // Act
    const result = service.createTask({ title: 'X' });
    // Assert
    expect(result.priority).toBe('medium');
    expect(mockRepo.insert).toHaveBeenCalledWith(expect.objectContaining({ priority: 'medium' }));
  });

  it('should throw ValidationError when title is empty', () => {
    expect(() => service.createTask({ title: '' })).toThrow(/title/i);
  });

  // ...edge case-үүд
});
```

## Ажил дуусахад

- [ ] Шинэ тестүүд `npm test` ажиллахад pass болж байна
- [ ] Coverage 70%+ болсон
- [ ] Edge case дор хаяж 3 ширхэг
- [ ] Хүний review хийгдсэн
