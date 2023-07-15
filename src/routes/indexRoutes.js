import express from "express";
import userRoutes from "./userRoutes.js";
import cardRoutes from "./cardRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/card", cardRoutes);

export default router;
