import * as service from '../services/tasks.service.js';
import {
  createTaskSchema,
  updateTaskSchema,
  taskQuerySchema,
  idParamSchema,
} from '../validation/tasks.schema.js';

// POST /api/tasks
export function create(req, res, next) {
  try {
    const data = createTaskSchema.parse(req.body);
    const task = service.createTask(data);
    res.status(201).json({ data: task });
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks
export function getAll(req, res, next) {
  try {
    const filters = taskQuerySchema.parse(req.query);
    const tasks = service.getAllTasks(filters);
    res.json({ data: tasks });
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks/:id
export function getOne(req, res, next) {
  try {
    const { id } = idParamSchema.parse(req.params);
    const task = service.getTaskById(id);
    res.json({ data: task });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/tasks/:id
export function update(req, res, next) {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = updateTaskSchema.parse(req.body);
    const task = service.updateTask(id, data);
    res.json({ data: task });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/tasks/:id
export function remove(req, res, next) {
  try {
    const { id } = idParamSchema.parse(req.params);
    service.deleteTask(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
