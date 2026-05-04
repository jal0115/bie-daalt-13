import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database file path
const DB_PATH = process.env.DB_PATH || join(__dirname, '../../data/tasks.db');

// Connect to DB
const db = new Database(DB_PATH);

// SQLite optimization settings
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Run migrations
const migrationSQL = readFileSync(join(__dirname, 'migrations.sql'), 'utf-8');
db.exec(migrationSQL);

export default db;
