import fetch from 'node-fetch';
import chalk from 'chalk';
import Database from 'better-sqlite3';

const db = new Database('./pokedex.db', { verbose: console.log });

const START_ID = 1;
const END_ID = 620;
const DELAY_MS = 500;

const API_URL = 'https://pokeapi.co/api/v2';

// Delay helper
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const setupDatabase = (() => {
    const createTable = `
    CREATE TABLE IF NOT EXISTS moves (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        type TEXT,
        accuracy INTEGER,
        power INTEGER,
        pp INTEGER,
        priority INTEGER
    );
  `;
  db.exec(createTable);
})();

(async () => {
  for (let id = START_ID; id <= END_ID; id++) {
    const row = db.prepare('SELECT id FROM moves WHERE id = ?').get(id);
    if (row) {
      console.log(chalk.green(`[OK] Movimiento con ID ${id} ya existe`));
      continue;
    }

    try {
      console.log(chalk.blue(`[FETCH] Obteniendo movimiento: ${id}`));
      const response = await fetch(`${API_URL}/move/${id}`);
      if (!response.ok) {
        console.log(chalk.red(`[ERROR] HTTP ${response.status} para ID ${id}`));
        continue;
      }

      const moveData = await response.json();

      // Some fields may be null (e.g., power)
      const name = moveData.name;
      const category = moveData.damage_class?.name || null;
      const type = moveData.type?.name || null;
      const accuracy = moveData.accuracy ?? null;
      const power = moveData.power ?? null;
      const pp = moveData.pp ?? null;
      const priority = moveData.priority ?? null;

      db.prepare(
        `INSERT OR IGNORE INTO moves
          (id, name, category, type, accuracy, power, pp, priority)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        id, name, category, type, accuracy, power, pp, priority
      );

      console.log(chalk.yellow(`[SAVE] Guardado: ${name}`));
    } catch (err) {
      console.error(chalk.red(`[ERROR] No se pudo obtener ${id}: ${err}`));
    }

    await delay(DELAY_MS);
  }

  console.log('✅ Seed de movimientos completado');
})();
