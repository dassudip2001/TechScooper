import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./lib/mongo";
import { prisma } from "./lib/prisma";

const app = express();

// connect mongodb
await connectDB();
// connect prisma
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// chat
// app.use("/api/chat", chatRoutes);

export default app;
