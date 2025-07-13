import fetch from 'node-fetch';
import chalk from 'chalk';
import Database from 'better-sqlite3';

const db = new Database('./pokedex.db', { verbose: console.log });

const START_ID = 1;
const END_ID = 649;
const DELAY_MS = 500;

const API_URL = 'https://pokeapi.co/api/v2';

// Avoid overwhelming the API with requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const setupDatabase = (() => {
    const createTable = `
    CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        data TEXT
    );
    `;
    db.exec(createTable);
})();

(async () => {
  for (let id = START_ID; id <= END_ID; id++) {
    const row = db.prepare('SELECT id FROM pokemon WHERE id = ?').get(id);
    if (row) {
      console.log(chalk.green(`[OK] Pokémon con ID ${id} ya existe`));
      continue;
    }

    try {
      console.log(chalk.blue(`[FETCH] Obteniendo data del Pokémon: ${id}`));
      const response = await fetch(`${API_URL}/pokemon/${id}`);
      if (!response.ok) {
        console.log(chalk.red(`[ERROR] HTTP ${response.status} para ID ${id}`));
        continue;
      }

      const data = await response.json();
      db.prepare('INSERT OR IGNORE INTO pokemon (id, name, data) VALUES (?, ?, ?)')
        .run(data.id, data.name, JSON.stringify(data));

      console.log(chalk.green(`[SAVE] Guardado: ${data.name}`));
    } catch (err) {
      console.error(chalk.red(`[ERROR] No se pudo obtener ${id}`));
    }

    await delay(DELAY_MS);
  }

  console.log('✅ Seed de Pokémon completado');
})();
