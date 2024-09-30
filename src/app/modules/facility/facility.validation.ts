import { z } from "zod";

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    // Ensure `pricePerHour` is processed as a number
    pricePerHour: z.preprocess(
      (val) => (val ? Number(val) : undefined),
      z.number().positive("Price per hour must be a positive number")
    ),
    location: z.string().nonempty("Location is required"),
    image: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    // Handle `pricePerHour` similarly for updates
    pricePerHour: z.preprocess(
      (val) => (val !== undefined ? Number(val) : undefined),
      z.number().positive().optional()
    ),
    location: z.string().optional(),
    image: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(), // Optional with default value
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
