import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Bicycle {
  id: number;
  name: string;
  brand: string;
  description: string;
  type: string;
  price: string;
  originalPrice?: number;
  rating: string;
  reviews: number;
  in_stock: boolean;
  condition: string;
  color: string;
  city: string;
  images?: string;
  specs?: string; // JSON field for specifications
  seller_description: string;
  created_at?: string;
  updated_at?: string;
}

const initialState: Bicycle[] = [];
export const bicycleSlice = createSlice({
  name: "bicycleSlice",
  initialState,
  reducers: {
    addBicycle: (state, action: PayloadAction<Bicycle>) => {
      state.push(action.payload);
    },
  },
});

export default bicycleSlice.reducer;
export const { addBicycle } = bicycleSlice.actions;
