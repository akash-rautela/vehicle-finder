export interface Vehicle {
  id: number;
  vehicleType: "2W" | "4W";
  brand: string;
  model: string;
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
  usageCategory?: string;
  priceCurrency?: string;
  priceBasis?: string;
  specificationStatus?: string;
  linkType?: string;
  rangeKM?: number | null;
  efficiencyUnit?: string;
  imageStatus?: string;
  dataNotes?: string[];
}

const initialData = require('./dist/initialData.js') as { vehicles?: Vehicle[] };

export const vehicles: Vehicle[] = Array.isArray(initialData.vehicles)
  ? initialData.vehicles
  : [];

export default vehicles;
