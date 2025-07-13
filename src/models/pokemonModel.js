import db from '../db/index.js';

export function findPokemonById(id) {
  return db.prepare('SELECT * FROM pokemon WHERE id = ?').get(id);
}
