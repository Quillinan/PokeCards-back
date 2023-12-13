import express from "express";
import userController from "../controllers/UserController.js";

const userRoutes = express.Router();

// Rota de cadastro (signup)
userRoutes.post("/signup", userController.signUp);

// Rota de login (signin)
userRoutes.post("/signin", userController.signIn);

export default userRoutes;
