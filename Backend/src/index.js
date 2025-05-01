import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db/sequelize.js";
import "./models/User.js";
import "./models/Favorite.js";
import authRoutes from "./routes/auth.js";
import favoriteRoutes from "./routes/favorites.js";
import trendingRoutes from "./routes/trending.js";
import { httpLogger, logger } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user/favorites", favoriteRoutes);
app.use("/api/trending", trendingRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => logger.info(`Notification Service on port ${PORT}`));
  } catch (err) {
    logger.error("Startup failed", err);
  }
};

start();
