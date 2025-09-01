import { 
  findPokemonById,
  findPokemonMoves
} from '../models/pokemonModel.js';

export async function getPokemon(req, res) {
  const { id } = req.params;
  const { withMoves } = req.query;

  let row = findPokemonById(id);
  if (!row) {
    console.log(`❌ Pokémon ${id} no encontrado`);
    return res.status(404).json({ error: 'Pokémon no encontrado' });
  }

  console.log(`✅ Pokémon ${id} desde SQLite`);

  const pokemon = JSON.parse(row.data);

  if (withMoves === "true") {
    const moves = findPokemonMoves(id, 4);
    pokemon.randomMoves = moves;
  }

  return res.json(pokemon);
}
