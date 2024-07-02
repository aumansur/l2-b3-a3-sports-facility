import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { BookingStatus } from "./booking.constant";

// user schema
const bookingSchema = new Schema<TBooking>({
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
    required: [true, " facility is required"],
  },
  date: {
    type: Date,
    required: [true, " date is required"],
  },
  startTime: {
    type: String,
    required: [true, " startTime is required"],
  },
  endTime: {
    type: String,
    required: [true, " endTime is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, " user is required"],
  },
  payableAmount: {
    type: Number,
    required: [true, " payableAmount is required"],
  },
  isBooked: {
    type: String,
    enum: BookingStatus,
    required: [true, " isBooked is required"],
  },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
