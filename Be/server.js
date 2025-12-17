import http from "http";
import dotenv from "dotenv";

import app from "./app";
import sequelize from "./config/db.js";
import initSocket from "./config/socket.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

/* ================== CREATE SERVER ================== */
const server = http.createServer();

/* ================== START SERVER ================== */
const startServer = async () => {
  try {
    // 1️⃣ Connect MySQL
    await sequelize.authenticate();
     console.log('MySQL connected');

    // 2️⃣ Init socket.io
    initSocket(server);
    

    // 3️⃣ Listen

     server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server start failed:", error);
    process.exit(1);
  }
};

startServer();
