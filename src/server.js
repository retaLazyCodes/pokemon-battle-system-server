import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemonRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (por ejemplo, desde curl o Postman)
    if (!origin) return callback(null, true);

    const allowed = /^http:\/\/(localhost|127\.0\.0\.1):\d{1,5}$/;

    if (allowed.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use('/api', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
