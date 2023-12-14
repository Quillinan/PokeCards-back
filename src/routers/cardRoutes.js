import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import cardController from "../controllers/cardController.js";

const cardRoutes = express.Router();

// Rota para adicionar um card
cardRoutes.post("/", verifyToken, cardController.addCard);

// Rota para obter todos os cards
cardRoutes.get("/", verifyToken, cardController.getCards);

// Rota para obter cards do usuário
cardRoutes.get("/user", verifyToken, cardController.getUserCards);

export default cardRoutes;
