import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: String,
    phone: Number,
    address: String,
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    price: Number,
    numberOfGuest: Number,
  },
  { timestamps: true }
);
export const Booking = mongoose.model("Booking", BookingSchema);
