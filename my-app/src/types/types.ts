export interface Ad {
    id: number;
    title: string;
    description?: string;
    price: number;
    category: Category;
    params: AutoParams | RealEstateParams | ElectronicsParams;
    createdAt: string; 
    updatedAt: string; 
    needsRevision: boolean;
  }
export type Category = "auto" | "real_estate" | "electronics";

export interface AutoParams {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
}

export interface RealEstateParams {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
}

export interface ElectronicsParams {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
}

export interface Ad {
  id: number;
  title: string;
  description?: string;
  price: number;
  category: Category;
  params: AutoParams | RealEstateParams | ElectronicsParams;
}