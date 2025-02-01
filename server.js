import express from "express";
import { connectDB } from "./db/connectDB.js";
import auth from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello world there");
});

app.get("/api", (req, res) => {
  res.send("API is ready");
});

// Routes
app.use("/api/auth", auth);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", 5000);
});
