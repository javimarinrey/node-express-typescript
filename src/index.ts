import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import authentication from "./authentication";

dotenv.config();

const app = express();

app.use(express.json()); // Para parsear JSON
app.use('/api', authentication, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
