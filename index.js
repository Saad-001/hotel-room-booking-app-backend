import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouteHandler from "./routes/auth.js";
import hotelsRouteHandler from "./routes/hotels.js";
import roomsRouteHandler from "./routes/rooms.js";
import usersRouteHandler from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

app.use("/auth", authRouteHandler);
app.use("/users", usersRouteHandler);
app.use("/hotels", hotelsRouteHandler);
app.use("/rooms", roomsRouteHandler);

// mongoose.connection.on("disconnected", () => {
//   console.log("mongodb disconnected");
// });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something is wrong!";
  res.status(status).json({
    success: false,
    message: message,
    status: status,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log("connected to backend");
});
