import { Schema, model } from "mongoose";
import { TFacility, facilityData } from "./facility.interface";

// user schema
const facilitySchema = new Schema<TFacility, facilityData>(
  {
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
    image: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// facilitySchema.statics.isFacilityExist = async function (id) {
//   console.log(id, "lol");

//   return await Facility.findById({ _id: id });
// };

// export const Facility = model<TFacility, facilityData>(
//   "Facility",
//   facilitySchema
// );

facilitySchema.statics.isFacilityExist = async function (id: string) {
  return await Facility.findById({ _id: id });
};

facilitySchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});

export const Facility = model<TFacility, facilityData>(
  "Facility",
  facilitySchema
);
