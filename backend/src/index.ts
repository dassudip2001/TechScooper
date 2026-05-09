import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./lib/mongo";
import { prisma } from "./lib/prisma";

import userRoute from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import categoryRouter from "./routes/categoryRoute";
import logRouter from "./routes/logRouter";

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

// user routes
app.use("/api/v1", userRoute);
// product router
app.use("/api/v1/product", productRouter);
// category router
app.use("/api/v1/categories", categoryRouter);
// log router
app.use("/api/v1/logs", logRouter);

export default app;
