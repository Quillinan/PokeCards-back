import express from "express";
import cors from "cors";
import "dotenv/config";
import indexRoutes from "./routers/indexRoutes.js";
import { mongoClient } from "./database/database.js";
import { handleApplicationErrors } from "./middlewares/errorHandling.js";

const app = express();
const port = process.env.PORT || 5000;

// Configuração do MongoDB
mongoClient.connect();
export const db = mongoClient.db();

// Middlewares
app.use(cors());
app.use(express.json()); // Substitui a necessidade do body-parser

// Rotas
app.use(indexRoutes);

// Middleware de tratamento de erros
app.use(handleApplicationErrors);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
