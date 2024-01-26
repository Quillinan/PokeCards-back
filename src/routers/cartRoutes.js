import express from "express";
import verifyToken from "../middlewares/AuthMiddleware.js";
import cartController from "../controllers/cartController.js";

const cartRoutes = express.Router();

// Rota para adicionar um card ao carrinho
cartRoutes.post("/add-to-cart", verifyToken, cartController.addToCart);

// Rota para finalizar a compra e remover o card do banco de dados
cartRoutes.post("/checkout", verifyToken, cartController.checkout);

//Rota para remover um card do carrinho.
cartRoutes.delete(
  "/remove-from-cart",
  verifyToken,
  cartController.removeFromCart
);

//Rota para obter os cards presentes no carrinho.
cartRoutes.get(
  "/get-cards-on-cart",
  verifyToken,
  cartController.getCardsOnCart
);

//Rota para obter carrinhos do usuário.
cartRoutes.get("/user-active-carts", verifyToken, cartController.getCarts);

export default cartRoutes;
