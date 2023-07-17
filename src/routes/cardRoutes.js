import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import cardController from "../controllers/CardController.js";

const cardRoutes = express.Router();

// Rota de cadastro (signup)
cardRoutes.post("/add-card", verifyToken, cardController.addCard);

// Rota para obter todos os cards
cardRoutes.get("/cards", verifyToken, cardController.getCards);

// Rota para obter cards do usuário
cardRoutes.get("/user-cards", verifyToken, cardController.getUserCards);

export default cardRoutes;
