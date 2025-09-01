import Database from 'better-sqlite3';

const db = new Database('./pokedex.db', { verbose: console.log });

const MOVE_LIMIT = 620;

const setupDatabase = (() => {
  const createTable = `
  CREATE TABLE IF NOT EXISTS pokemon_moves (
    pokemon_id INTEGER,
    move_id INTEGER,
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (move_id) REFERENCES moves(id)
  );
  `;
  db.exec(createTable);
})();

const extractMoveId = (url) => {
  const match = url.match(/\/move\/(\d+)\//);
  return match ? parseInt(match[1]) : null;
};

(() => {
  const pokemons = db.prepare('SELECT id, name, data FROM pokemon').all();
  const insert = db.prepare('INSERT OR IGNORE INTO pokemon_moves (pokemon_id, move_id) VALUES (?, ?)');

  for (const pkm of pokemons) {
    const data = JSON.parse(pkm.data);
    if (!data.moves) continue;

    for (const move of data.moves) {
      const moveId = extractMoveId(move.move.url);
      if (moveId && moveId <= MOVE_LIMIT) {
        console.log(`(${pkm.id}) ${pkm.name} -> Move ${moveId}`)
        insert.run(pkm.id, moveId);
      }
    }
  }

  console.log('✅ Seed de relaciones Pokémon-Moves completado');
})();
