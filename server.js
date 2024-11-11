import express from "express";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello world there");
});

app.get("/api/register", (req, res) => {
  res.send("Welcome to Lost n Found");
});

app.post("/api/register", (req, res) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    errors.push("You must enter an email");
  }

  if (!password) {
    errors.push("You must enter a password");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    res.status(201).json({
      status: 201,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred o!",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
    connectDB();
  console.log("Server is running on port 5000. Damn!!");
});
