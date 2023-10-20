import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
// CONFIGURATIONS
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) =>
    console.log(`MONGO CONNECTED SUCCESSFULLY-${res.connection.host}`)
  )
  .catch((e) => console.log("Mongo did not connected successfully"));

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

app.listen("8000");
