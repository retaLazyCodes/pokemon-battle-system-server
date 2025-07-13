import { Router } from 'express';
import { getPokemon } from '../controllers/pokemonController.js';

const router = Router();

router.get('/pokemon/:id', getPokemon);

export default router;
