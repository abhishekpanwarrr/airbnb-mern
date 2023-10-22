import mongoose, { Schema } from "mongoose";

const PlaceSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuest: Number,
  },
  { timestamps: true }
);

export const PlaceModel = mongoose.model("Place", PlaceSchema);
