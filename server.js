import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.js"
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

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


// Routes
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
  console.log("Server is running on port: ", 5000);
});
