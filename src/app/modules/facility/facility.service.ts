import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityIntoDB = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    }
  );
  return result;
};
const getFacilityFromDB = async () => {
  const result = await Facility.find();
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getFacilityFromDB,
};
