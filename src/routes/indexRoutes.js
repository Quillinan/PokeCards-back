import express from "express";
import userRoutes from "./userRoutes.js";
import cardRoutes from "./cardRoutes.js";
import cartRoutes from "./cartRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("PokeCards vive!!");
});
router.use("/user", userRoutes);
router.use("/card", cardRoutes);
router.use("/cart", cartRoutes);

export default router;
