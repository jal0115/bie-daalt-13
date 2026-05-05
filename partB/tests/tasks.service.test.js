import { jest } from '@jest/globals';

// Mock the repository module
jest.unstable_mockModule('../src/repositories/tasks.repository.js', () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

// Import after mocking
const repository = await import('../src/repositories/tasks.repository.js');
const service = await import('../src/services/tasks.service.js');

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // === createTask ===
  describe('createTask', () => {
    it('should create task and return it', () => {
      const data = { title: 'Test', priority: 'high' };
      const created = { id: 1, ...data, description: null, due_date: null };
      repository.create.mockReturnValue(created);

      const result = service.createTask(data);

      expect(result).toEqual(created);
      expect(repository.create).toHaveBeenCalledWith(data);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  // === getAllTasks ===
  describe('getAllTasks', () => {
    it('should return all tasks when no filters', () => {
      const tasks = [{ id: 1, title: 'A' }, { id: 2, title: 'B' }];
      repository.findAll.mockReturnValue(tasks);

      const result = service.getAllTasks();

      expect(result).toEqual(tasks);
      expect(repository.findAll).toHaveBeenCalledWith({});
    });

    it('should pass filters to repository', () => {
      const filters = { priority: 'high' };
      repository.findAll.mockReturnValue([]);

      service.getAllTasks(filters);

      expect(repository.findAll).toHaveBeenCalledWith(filters);
    });
  });

  // === getTaskById ===
  describe('getTaskById', () => {
    it('should return task when found', () => {
      const task = { id: 1, title: 'Test' };
      repository.findById.mockReturnValue(task);

      const result = service.getTaskById(1);

      expect(result).toEqual(task);
    });

    it('should throw NotFoundError when task not exists', () => {
      repository.findById.mockReturnValue(undefined);

      expect(() => service.getTaskById(999)).toThrow(/not found/);
    });

    it('should throw error with statusCode 404', () => {
      repository.findById.mockReturnValue(null);

      try {
        service.getTaskById(999);
      } catch (err) {
        expect(err.statusCode).toBe(404);
      }
    });
  });

  // === updateTask ===
  describe('updateTask', () => {
    it('should update existing task', () => {
      const existing = { id: 1, title: 'Old' };
      const updated = { id: 1, title: 'New' };
      repository.findById.mockReturnValue(existing);
      repository.update.mockReturnValue(updated);

      const result = service.updateTask(1, { title: 'New' });

      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalledWith(1, { title: 'New' });
    });

    it('should throw NotFoundError when updating non-existent task', () => {
      repository.findById.mockReturnValue(undefined);

      expect(() => service.updateTask(999, { title: 'X' })).toThrow(/not found/);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  // === deleteTask ===
  describe('deleteTask', () => {
    it('should return true when task deleted', () => {
      repository.remove.mockReturnValue(true);

      const result = service.deleteTask(1);

      expect(result).toBe(true);
      expect(repository.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundError when task not exists', () => {
      repository.remove.mockReturnValue(false);

      expect(() => service.deleteTask(999)).toThrow(/not found/);
    });
  });
});
