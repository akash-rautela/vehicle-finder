import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle {
  vehicleType: "2W" | "4W";
  brand: string;
  vehicleModel: string;
  energyType: "Petrol" | "Electric" | "Diesel" | "CNG";
  price: number;
  engineCC: number;
  mileage: number;
  powerBHP: number;
  torqueNM: number;
  weightKG: number;
  seatingCapacity: number;
  groundClearanceMM: number;
  usageType: "daily" | "sports" | "cruiser" | "adventure";
  link: string;
  image?: string;
}

const VehicleSchema: Schema = new Schema({
  vehicleType: { type: String, enum: ["2W", "4W"], required: true },
  brand: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  energyType: { type: String, enum: ["Petrol", "Electric", "Diesel", "CNG"], required: true },
  price: { type: Number, required: true },
  engineCC: { type: Number, required: true },
  mileage: { type: Number, required: true },
  powerBHP: { type: Number, required: true },
  torqueNM: { type: Number, required: true },
  weightKG: { type: Number, required: true },
  seatingCapacity: { type: Number, required: true },
  groundClearanceMM: { type: Number, required: true },
  usageType: { type: String, enum: ["daily", "sports", "cruiser", "adventure"], required: true },
  link: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
