import { z } from 'zod';

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
  due_date: z.string().datetime().optional().nullable(),
});

// Schema for updating a task (all fields optional)
export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_date: z.string().datetime().optional().nullable(),
});

// Schema for query filters (search, filter)
export const taskQuerySchema = z.object({
  q: z.string().max(200).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

// Schema for ID param
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
