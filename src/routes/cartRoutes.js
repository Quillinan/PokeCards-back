import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import cartController from "../controllers/CartController.js";

const cartRoutes = express.Router();

// Rota para adicionar um card ao carrinho
cartRoutes.post("/add-to-cart", verifyToken, cartController.addToCart);

// Rota para finalizar a compra e remover o card do banco de dados
cartRoutes.post("/checkout", verifyToken, cartController.checkout);

export default cartRoutes;
