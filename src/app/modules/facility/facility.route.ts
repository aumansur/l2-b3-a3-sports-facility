import express from "express";

import validateRequest from "../../middleware/validetRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityControllers } from "./facility.controller";
import auth from "../../middleware/auth";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/facility",
  auth("admin"),
  multerUpload.single("image"), // Multer middleware for single file upload
  validateRequest(FacilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility
);
router.put(
  "/facility/:id",
  auth("admin"),
  validateRequest(FacilityValidations.updateFacilityValidationSchema),
  FacilityControllers.updateFacility
);
router.delete(
  "/facility/:id",
  auth("admin"),
  FacilityControllers.deleteFacility
);
router.get("/facility", FacilityControllers.getFacilities);
// get single page facility
router.get("/facility/:id", FacilityControllers.getSingleFacilityById);

export const FacilityRoutes = router;
