import db from '../db/index.js';

export function findPokemonById(id) {
  return db.prepare('SELECT * FROM pokemon WHERE id = ?').get(id);
}

export function findPokemonMoves(id, limit = 4) {
  return db.prepare(`
    SELECT m.*
    FROM moves m
    JOIN pokemon_moves pm ON m.id = pm.move_id
    WHERE pm.pokemon_id = ?
    ORDER BY RANDOM()
    LIMIT ?
  `).all(id, limit);
}