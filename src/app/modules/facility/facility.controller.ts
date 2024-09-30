import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { FacilityServices } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body); // No need to parse facilityData
  // if (result.length === 0) {
  //   return sendResponse(res, {
  //     success: false,

  //     statusCode: 404,
  //     message: "No Data Found",
  //     data: result,
  //   });
  // }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Facility created successfully",
    data: result,
  });
});

// update put method
const updateFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "facility updated successfully",
    data: result,
  });
});
const deleteFacility = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacilityServices.deleteFacilityFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "facility updated successfully",
    data: result,
  });
});
// retrieve facility successfully

const getFacilities = catchAsync(async (req, res) => {
  const result = await FacilityServices.getFacilityFromDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "facilities retrieved successfully",
    data: result,
  });
});

// get single facility controllers

const getSingleFacilityById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacilityServices.getSingleFacilityByIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "facility retrieved successfully",
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getFacilities,
  getSingleFacilityById,
};
