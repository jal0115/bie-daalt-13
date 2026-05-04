import db from '../db/index.js';

// Prepared statements (compiled once, reused)
const insertStmt = db.prepare(`
  INSERT INTO tasks (title, description, priority, due_date)
  VALUES (@title, @description, @priority, @due_date)
`);

const findByIdStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');

const findAllStmt = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC');

const deleteStmt = db.prepare('DELETE FROM tasks WHERE id = ?');

// Create new task
export function create(data) {
  const result = insertStmt.run({
    title: data.title,
    description: data.description ?? null,
    priority: data.priority ?? 'medium',
    due_date: data.due_date ?? null,
  });
  return findByIdStmt.get(result.lastInsertRowid);
}

// Find task by ID
export function findById(id) {
  return findByIdStmt.get(id);
}

// Find all tasks (with optional filters)
export function findAll(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.q) {
    conditions.push('title LIKE ?');
    params.push(`%${filters.q}%`);
  }

  if (filters.priority) {
    conditions.push('priority = ?');
    params.push(filters.priority);
  }

  let sql = 'SELECT * FROM tasks';
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  sql += ' ORDER BY created_at DESC';

  return db.prepare(sql).all(...params);
}

// Update task by ID
export function update(id, data) {
  const fields = [];
  const params = {};

  if (data.title !== undefined) {
    fields.push('title = @title');
    params.title = data.title;
  }
  if (data.description !== undefined) {
    fields.push('description = @description');
    params.description = data.description;
  }
  if (data.priority !== undefined) {
    fields.push('priority = @priority');
    params.priority = data.priority;
  }
  if (data.due_date !== undefined) {
    fields.push('due_date = @due_date');
    params.due_date = data.due_date;
  }

  if (fields.length === 0) {
    return findById(id);
  }

  fields.push("updated_at = datetime('now')");
  params.id = id;

  const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = @id`;
  db.prepare(sql).run(params);
  return findById(id);
}

// Delete task by ID
export function remove(id) {
  const result = deleteStmt.run(id);
  return result.changes > 0;
}
