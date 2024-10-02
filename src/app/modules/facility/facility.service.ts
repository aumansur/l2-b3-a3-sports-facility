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
  let filterQuery;
  if (searchTerms) {
    const searchQuery = {
      $or: ["name", "description", "location"].map((field) => ({
        [field]: { $regex: searchTerms, $options: "i" }, // Case-insensitive partial search
      })),
    };
    filterQuery = Facility.find({ ...searchQuery, ...queryObj });
  } else {
    filterQuery = Facility.find({ ...queryObj });
  }

  // Sorting logic
  let sortOption: { [key: string]: 1 | -1 } = { createdAt: -1 }; // Default to newest first
  if (query?.sort) {
    const sortField = query.sort.startsWith("-")
      ? query.sort.slice(1)
      : query.sort;
    const sortOrder = query.sort.startsWith("-") ? -1 : 1;

    if (["pricePerHour", "createdAt"].includes(sortField)) {
      sortOption = { [sortField]: sortOrder };
    } else {
      console.error(`Unsupported sorting field: ${sortField}`);
    }
  }
  filterQuery = filterQuery.sort(sortOption);

  // Pagination logic
  const limit = Math.max(Number(query?.limit) || 5, 1); // Default limit
  const page = Math.max(Number(query?.page) || 1, 1); // Default page
  const skip = (page - 1) * limit;

  // Execute the query with pagination
  const facilities = await filterQuery.limit(limit).skip(skip);

  // Count total documents
  const total = await Facility.countDocuments({ ...queryObj });

  return {
    data: facilities,
    total, // Return the total number of results
    limit, // Return the limit (items per page)
    page, // Return the current page
  };
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
