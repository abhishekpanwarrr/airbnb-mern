import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const jwtSecret = "highlevelsecret";
const bcryptSalt = bcrypt.genSaltSync(10);

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
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) =>
    console.log(`MONGO CONNECTED SUCCESSFULLY-${res.connection.host}`)
  )
  .catch((e) => console.log("Mongo did not connected successfully"));

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const existedUser = await UserModel.findOne({ email: email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existedUser = await UserModel.findOne({ email: email });
    if (!existedUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const unHashedPassword = bcrypt.compareSync(password, existedUser.password);
    if (!unHashedPassword) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const token = jwt.sign(
      {
        email: existedUser.email,
        id: existedUser._id,
        name: existedUser.name,
      },
      jwtSecret
    );
    existedUser.password = undefined;
    if (token) {
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json(existedUser);
    }
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw Error;
      res.json(user);
    });
  }
  res.json(null);
}); 

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});



app.listen("8000");
