import express from "express";

import validateRequest from "../../middleware/validetRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post(
  "/bookings",
  auth("user"),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking
);
router.get("/check-availability", BookingControllers.checkAvailableSlots);
router.get("/bookings", auth("admin"), BookingControllers.getAllBookings);
router.get(
  "/bookings/user",
  auth("user"),
  BookingControllers.getAllBookingsForUser
);
router.delete(
  "/bookings/:bookingId",
  auth("user"),
  BookingControllers.cancelBooking
);

export const BookingRoutes = router;
