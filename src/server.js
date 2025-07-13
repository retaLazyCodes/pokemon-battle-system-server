import express from 'express';
import pokemonRoutes from './routes/pokemonRoutes.js';

const app = express();
const PORT = 3000;

app.use('/api', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
