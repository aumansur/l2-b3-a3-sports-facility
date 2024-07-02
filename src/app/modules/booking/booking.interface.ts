import { Types } from "mongoose";
export type isBooked = "confirmed" | "unconfirmed" | "canceled";

export type TBooking = {
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: isBooked;
};

export type TTimeSlot = {
  startTime: string;
  endTime: string;
};
