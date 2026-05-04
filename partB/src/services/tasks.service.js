import * as repository from '../repositories/tasks.repository.js';

// Custom error class for "not found" cases
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

// Create a new task
export function createTask(data) {
  return repository.create(data);
}

// Get all tasks (with optional filters)
export function getAllTasks(filters = {}) {
  return repository.findAll(filters);
}

// Get one task by ID (throws NotFoundError if missing)
export function getTaskById(id) {
  const task = repository.findById(id);
  if (!task) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return task;
}

// Update a task by ID
export function updateTask(id, data) {
  const existing = repository.findById(id);
  if (!existing) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return repository.update(id, data);
}

// Delete a task by ID
export function deleteTask(id) {
  const deleted = repository.remove(id);
  if (!deleted) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return true;
}
