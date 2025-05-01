import express from "express";
import Favorite from "../models/Favorite.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.user.userId },
  });
  res.json(favorites.map((f) => f.countryCode));
});

router.post("/", authMiddleware, async (req, res) => {
  const { cca3 } = req.body;
  await Favorite.findOrCreate({
    where: { userId: req.user.userId, countryCode: cca3 },
  });
  res.json({ message: "Added" });
});

router.delete("/", authMiddleware, async (req, res) => {
  const { cca3 } = req.body;
  await Favorite.destroy({
    where: { userId: req.user.userId, countryCode: cca3 },
  });
  res.json({ message: "Removed" });
});

export default router;
