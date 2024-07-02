import { Schema, model } from "mongoose";
import { TFacility, facilityData } from "./facility.interface";

// user schema
const facilitySchema = new Schema<TFacility, facilityData>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

facilitySchema.statics.isFacilityExist = async function (id) {
  console.log(id, "lol");

  return await Facility.findById({ _id: id });
};

export const Facility = model<TFacility, facilityData>(
  "Facility",
  facilitySchema
);
