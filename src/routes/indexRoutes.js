import express from "express";
import userRoutes from "./userRoutes.js";
// import cardsRoutes from "./cardRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
// router.use("/cards", cardRoutes);

export default router;
