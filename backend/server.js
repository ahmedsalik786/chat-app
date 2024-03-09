import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

//const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

// app.get("/", (req, res) => {
//   console.log(req.query);
//   res.send("Welcome salik");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server is running on port ${PORT}`);
// });

//   AGC200
