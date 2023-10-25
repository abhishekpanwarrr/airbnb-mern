import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { UserModel } from "./models/User.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PlaceModel } from "./models/Place.js";
import { Booking } from "./models/Booking.js";

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

app.post("/api/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    addedPhotos,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ message: "Invalid token" });
      }
      const place = await PlaceModel.create({
        owner: user.id,
        title,
        address,
        description,
        photos: addedPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest: maxGuests,
      });
      res.status(201).json(place);
    });
  } catch (error) {
    console.error("Error during place creation:", error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/api/places", (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ message: "Invalid token" });
      }
      const { id } = user;
      const places = await PlaceModel.find({ owner: id });

      res.status(200).json(places);
    });
  } catch (error) {
    console.error("Error during place creation:", error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const place = await PlaceModel.findOne({ _id: id });
    res.status(200).json(place);
  } catch (error) {
    console.error("Error during place creation:", error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/api/allPlaces/", async (req, res) => {
  try {
    const allPlaces = await PlaceModel.find();
    res.status(200).json(allPlaces);
  } catch (error) {
    console.error("Error during place creation:", error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/api/booking", async (req, res) => {
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuest,
    name,
    phone,
    address,
    price,
  } = req.body;
  try {
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuest,
      name,
      phone,
      address,
      price,
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error during place creation:", error);
    res.status(500).json({ message: "something went wrong" });
  }
});
app.listen("8000");
