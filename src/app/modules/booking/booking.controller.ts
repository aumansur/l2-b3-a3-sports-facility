import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(
    req?.user?.email,
    req.body
  );

  sendResponse(res, {
    success: true,

    statusCode: 200,
    message: "Booking created successfully",

    data: result,
  });
});

const checkAvailableSlots = catchAsync(async (req, res) => {
  const date = req.query.date
    ? new Date(req.query.date as string)
    : new Date(new Date().toISOString().split("T")[0]);

  const result = await BookingServices.findAvailableBookingTimeIntoDB(date);

  sendResponse(res, {
    success: true,

    statusCode: 200,
    message: "Availability checked successfully",

    data: result,
  });
});

// get all booking

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getAllBookingsForUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  console.log(email);

  const result = await BookingServices.getAllBookingsForUserSpecificFromDB(
    email
  );

  // eslint-disable-next-line no-compare-neg-zero
  if (result.length == -0) {
    return sendResponse(res, {
      success: false,

      statusCode: 404,
      message: "No Bookings Data found ",
    });
  }
  sendResponse(res, {
    success: true,

    statusCode: 200,
    message: "Bookings  retrieved successfully",

    data: result,
  });
});

// cancel booking by user
const cancelBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.bookingId;
  const result = await BookingServices.cancelBookingFromUser(bookingId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  checkAvailableSlots,
  getAllBookings,
  getAllBookingsForUser,
  cancelBooking,
};
