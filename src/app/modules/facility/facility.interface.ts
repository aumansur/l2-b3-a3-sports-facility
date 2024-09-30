import { Model, Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  image?: string;
  location: string;
  isDeleted: boolean;
};

export interface facilityData extends Model<TFacility> {
  // eslint-disable-next-line no-unused-vars
  isFacilityExist(id: Types.ObjectId): Promise<TUser | null>;
}
