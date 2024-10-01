import AppError from "../../errors/AppError";
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
    { isDeleted: true }
  );
  return result;
};

const getFacilityFromDB = async (query: Record<string, any>) => {
  const excludes = ["searchTerm", "sort", "limit", "page", "fields"];
  let searchTerms = "";

  // Clone the query object and filter out the exclude fields
  const queryObj: Record<string, unknown> = { ...query, isDeleted: false };
  excludes.forEach((el) => delete queryObj[el]);

  // Handle search term if provided
  if (query?.searchTerm) {
    searchTerms = query.searchTerm;
  }

  // Build the search query for multiple fields
  const searchQuery = {
    $or: ["name", "description", "location"].map((field) => ({
      [field]: { $regex: searchTerms, $options: "i" }, // Case-insensitive partial search
    })),
  };

  // Apply filters from query object (excluding unnecessary ones)
  const filterQuery = Facility.find({ ...searchQuery, ...queryObj });

  // Sorting logic
  let sort = "createdAt"; // Default sorting by createdAt
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortedQuery = filterQuery.sort(sort);

  // Pagination logic
  let limit = 5; // Default limit
  let page = 1; // Default page
  let skip = 0;

  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  // Execute the final query with pagination
  const facilities = await sortedQuery.limit(limit).skip(skip);

  return facilities;
};

// Get single facility by ID
const getSingleFacilityByIdFromDB = async (id: string) => {
  const result = await Facility.findById({ _id: id });

  if (!result) {
    throw new AppError(404, "Facility not found");
  }

  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getFacilityFromDB,
  getSingleFacilityByIdFromDB,
};
