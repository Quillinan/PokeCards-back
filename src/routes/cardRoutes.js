import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import cardController from "../controllers/Card.Controller.js";

const cardRoutes = express.Router();

// Rota de cadastro (signup)
cardRoutes.post("/addCard", verifyToken, cardController.addCard);

// Rota para obter todos os cards
cardRoutes.get("/cards", verifyToken, cardController.getCards);

export default cardRoutes;
