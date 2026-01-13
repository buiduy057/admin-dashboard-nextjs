import http from "http";
import "dotenv/config";

import app from "./app.js";
import sequelize from "./config/db.js";
import initSocket from "./config/socket.js";
import "./models/index.js";
import seedAdmin from "./seed/admin.seed.js";
const PORT = process.env.PORT || 3001;

/* ================== CREATE SERVER ================== */
const server = http.createServer(app);

/* ================== START SERVER ================== */
const startServer = async () => {
  try {
    // 1️⃣ Connect MySQL
    await sequelize.authenticate();
    await sequelize.sync();
        // await sequelize.sync({ force: true });
    console.log("MySQL connected");
    await seedAdmin();
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
