---
description: Generate Jest unit tests for Personal Task Tracker layers
---

# /test

Сонгосон файлд Jest unit test үүсгэх. Mock-той unit test, ES modules-той ажиллана.

## Project setup-ийн онцлог

- **Test runner:** Jest 30+ (experimental-vm-modules-аар ажиллана)
- **Mock:** `jest.unstable_mockModule` (top-level await дэмждэг)
- **Coverage target:** Service ба Repository layer-ийг 80%+ покрытие

## Жишээ test - Service layer

```javascript
import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/repositories/tasks.repository.js', () => ({
  create: jest.fn(),
  findById: jest.fn(),
  // ...бусад
}));

const repository = await import('../src/repositories/tasks.repository.js');
const service = await import('../src/services/tasks.service.js');

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create task and return it', () => {
    // Arrange
    const data = { title: 'Test', priority: 'high' };
    repository.create.mockReturnValue({ id: 1, ...data });

    // Act
    const result = service.createTask(data);

    // Assert
    expect(result.id).toBe(1);
    expect(repository.create).toHaveBeenCalledWith(data);
  });
});
```

## Edge case-уудыг заавал багтаах

- Empty input (`""`, `null`, `undefined`)
- Very long string (>200 chars)
- Special chars (`'`, `"`, `;`, SQL injection attempts)
- Boundary numbers (0, -1, MAX_INT)
- Wrong type (string instead of number)

## Test name стандарт

Жишээ:
- `should return task when found by id`
- `should throw NotFoundError when task not exists`
- `should default priority to "medium" when not provided`

## Output дүрэм

- AAA pattern (Arrange/Act/Assert) тодорхой бичих
- Нэг test → нэг behavior
- Mock cleanup `beforeEach`-д хийх
- Coverage 80%-аас доош биш

## Жишээ хэрэглээ
→ service.js-д 8-12 unit test үүсгэх (бүх method, edge case-тэй).
