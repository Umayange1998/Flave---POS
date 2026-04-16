import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

import userRouter from "./routers/userRoute.js";
import orderRoter from "./routers/orderRoutes.js";
import tableRoter from "./routers/tableRoutes.js";
import paymentRouter from "./routers/paymentRoutes.js";

app.use("/user", userRouter);
app.use("/orders", orderRoter);
app.use("/tables", tableRoter);
app.use("/payment", paymentRouter);

//Global Error Handler
app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
