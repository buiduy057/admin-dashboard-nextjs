import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import auditRoutes from "./modules/audit/audit.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";

import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

/* ================== GLOBAL MIDDLEWARE ================== */

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// parse json body
app.use(express.json());
// parse form-data / x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// log request (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/audit-logs", auditRoutes);

/* ================== NOT FOUND ================== */

app.use((req, res) => {
  res.status(404).json({ message: "API not found" });
});

app.use(errorHandler);
export default app;
