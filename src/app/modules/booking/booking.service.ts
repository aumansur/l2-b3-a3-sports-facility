import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import {
  calculateAvailableSlots,
  calculatePayableAmount,
} from "./booking.utils";

const createBookingIntoDB = async (email: string, payload: TBooking) => {
  console.log(payload.startTime);

  if (!(await Facility.isFacilityExist(payload.facility))) {
    throw new AppError(404, "Facility does'not exist");
  }
  if (!payload.startTime) {
    throw new Error("startTime is required");
  }
  if (!payload.endTime) {
    throw new Error("EndTime is required");
  }
  //  find user by email  then retrieve userId for referencing
  const findUserId = await User.findOne({ email });
  if (!findUserId) {
    throw new AppError(
      404,
      "user does'not exist .please login again .this issue arise you are trying other set other user id . Dont nee provide userID its autometic "
    );
  }

  console.log(findUserId, "iam finded user id");

  const extractUserId = findUserId._id as Types.ObjectId;
  console.log(extractUserId, "ho");

  const PayableAmount = calculatePayableAmount(
    payload.startTime,
    payload.endTime
  );
  payload.user = extractUserId;
  payload.payableAmount = PayableAmount;

  payload.isBooked = "confirmed";
  const result = await Booking.create(payload);
  return result;
};

const findAvailableBookingTimeIntoDB = async (date: Date) => {
  const hasBookingExists = await Booking.find({ date: date });
  const availableSlot = calculateAvailableSlots(hasBookingExists);
  return availableSlot;
};
// get all data
const getAllBookings = async () => {
  const allBookings = await Booking.find({});
  return allBookings;
};

const getAllBookingsForUserSpecificFromDB = async (email: string) => {
  // find user then collect user id from user colloection
  const findExistUserByEmail = await User.findOne({ email: email });
  console.log("iam user existing", findExistUserByEmail);

  if (!findExistUserByEmail) {
    throw new Error("User not found");
  }

  //  search all bookings by user id

  const result = await Booking.find({
    user: findExistUserByEmail._id,
  }).populate("facility");
  return result;
};
// delete all bookings from user
const cancelBookingFromUser = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: "canceled",
    },
    {
      new: true,
    }
  ).populate("facility");

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  findAvailableBookingTimeIntoDB,
  getAllBookings,
  getAllBookingsForUserSpecificFromDB,
  cancelBookingFromUser,
};
