import express from "express";
import cors from "cors";
import "dotenv/config";
import indexRoutes from "./routers/indexRoutes.js";
import { mongoClient } from "./database/database.js";

const app = express();
const port = process.env.PORT || 5000;

// Configuração do MongoDB
mongoClient.connect();
export const db = mongoClient.db();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(indexRoutes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
