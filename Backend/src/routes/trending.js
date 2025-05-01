import express from "express";
import redis from "../db/redisClient.js";

const router = express.Router();

const getTodayKey = () => {
  const today = new Date().toISOString().split("T")[0];
  return `trending:${today}`;
};

router.post("/track", async (req, res) => {
  const { cca3 } = req.body;
  if (!cca3) return res.status(400).json({ error: "Missing cca3" });

  const key = getTodayKey();
  await redis.zincrby(key, 1, cca3);
  await redis.expire(key, 86400);
  res.json({ message: "Tracked" });
});

router.get("/", async (req, res) => {
  const key = getTodayKey();
  const limit = parseInt(req.query.limit || "10"); // default to 10
  const raw = await redis.zrevrange(key, 0, limit - 1, "WITHSCORES");

  const trending = [];
  for (let i = 0; i < raw.length; i += 2) {
    trending.push({ cca3: raw[i], count: parseInt(raw[i + 1]) });
  }

  res.json({ trending });
});

export default router;
