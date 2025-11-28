import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Type definition
export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  type: string;
  // Financial
  price: string; // stored as string
  lyciense_status: string;
  // User Engagement
  rating: string | number;
  reviews: string;
  in_stock: string | number; // "true"/"false"

  // Descriptions & Status
  condition: string;
  color: string;
  city: string;
  description: string;
  seller_description: string;

  // Bike Specific Details (nullable)
  model_year?: string; // as string
  mileage?: string;
  engine_capacity?: string;
  fuel_type?: string;

  // JSON Columns (nullable)
  images?: string[] | string;
  specs?: { [key: string]: string | boolean }[];

  // Timestamps
  created_at: string;
  updated_at: string;
}

// Initial state
const initialState: Motorcycle[] = [
  // {
  //   id: "1",
  //   name: "Yamaha R15",
  //   brand: "Yamaha",
  //   price: "3500000",
  //   rating: "4.7",
  //   reviews: "25",
  //   in_stock: "true",
  //   condition: "Excellent",
  //   color: "Blue",
  //   city: "Yangon",
  //   description: "A fast and reliable sports bike.",
  //   seller_description: "Well-maintained, single owner.",
  //   model_year: "2023",
  //   mileage: "1,200 km",
  //   engine_capacity: "155cc",
  //   fuel_type: "Petrol",
  //   images: ["/images/bike1.jpg", "/images/bike2.jpg"],
  //   specs: [
  //     { key: "ABS", value: true },
  //     { key: "Seat Height", value: "815mm" },
  //   ],
  //   created_at: "2025-11-11T00:00:00Z",
  //   updated_at: "2025-11-11T00:00:00Z",
  // },
];

// Slice
export const bikeSlice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    addBike: (state, action: PayloadAction<Motorcycle>) => {
      state.push(action.payload);
    },
  },
});

export const { addBike } = bikeSlice.actions;
export default bikeSlice.reducer;
