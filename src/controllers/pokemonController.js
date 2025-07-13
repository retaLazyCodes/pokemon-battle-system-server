import { findPokemonById } from '../models/pokemonModel.js';

export async function getPokemon(req, res) {
  const { id } = req.params;

  let row = findPokemonById(id);
  if (row) {
    console.log(`✅ Pokémon ${id} desde SQLite`);
    return res.json(JSON.parse(row.data));
  } else {
    console.log(`❌ Pokémon ${id} no encontrado`);
    return res.status(404).json({ error: 'Pokémon no encontrado' });
  }
}
