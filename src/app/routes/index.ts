import { Router } from "express";

import { FacilityRoutes } from "../modules/facility/facility.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = Router();

// const modulesRoutes = [
//   {
//     path: "/auth",
//     route: AuthRoutes,
//   },
//   {
//     path: "/",
//     route: FacilityRoutes,
//   },
//   {
//     path: "/",
//     route: BookingRoutes,
//   },
// ];

const modulesRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "",
    route: FacilityRoutes,
  },
  {
    path: "",
    route: BookingRoutes,
  },
  {
    path: "",
    route: userRoutes,
  },
  {
    path: "",
    route: PaymentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
