import Database from 'better-sqlite3';

const db = new Database('./pokedex.db');

export default db;
