import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import loggerMiddleware from "./loggerMiddleware";

dotenv.config();

const app = express();

app.use(express.json()); // Para parsear JSON
app.use('/api', loggerMiddleware, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
