import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect database first
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`[TalentHunt Server] Running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
      console.log(`[TalentHunt Server] Health check available at: http://localhost:${PORT}/api/health`);
    });

    // Handle Unhandled Promise Rejections
    process.on("unhandledRejection", (err) => {
      console.error(`[Server Error] Unhandled Rejection: ${err.message}`);
      // Graceful shutdown
      server.close(() => process.exit(1));
    });

    // Handle Uncaught Exceptions
    process.on("uncaughtException", (err) => {
      console.error(`[Server Error] Uncaught Exception: ${err.message}`);
      process.exit(1);
    });

    // Handle SIGTERM
    process.on("SIGTERM", () => {
      console.log("[TalentHunt Server] SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("[TalentHunt Server] Process terminated.");
      });
    });
  } catch (error) {
    console.error(`[Fatal Startup Error] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
