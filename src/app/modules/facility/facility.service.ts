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
  // Exclude fields from query that shouldn't be used in filtering
  const excludes = ["searchTerm", "sort", "limit", "page", "fields"];
  let searchTerms = "";

  // Create a query object excluding unnecessary fields like searchTerm, sort, etc.
  const queryObj: Record<string, unknown> = { ...query, isDeleted: false };
  excludes.forEach((el) => delete queryObj[el]);

  // If there's a searchTerm in the query, assign it
  if (query?.searchTerm) {
    searchTerms = query.searchTerm;
  }

  // Create a search query using $regex for case-insensitive partial matches
  const searchQuery = Facility.find({
    $or: ["name", "description", "location"].map((field) => ({
      [field]: { $regex: searchTerms, $options: "i" },
    })),
  });

  // Apply any additional filters from the queryObj
  const filterQuery = searchQuery.find(queryObj);

  // Sorting
  let sort = "createdAt"; // Default sort by createdAt
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  // Pagination: limit and page
  let limit = 5;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query.limit);
  }
  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  // Paginate and return the result
  const skipQuery = await sortQuery.limit(limit).skip(skip);

  return skipQuery;
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
