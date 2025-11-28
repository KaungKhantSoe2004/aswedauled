import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Type definition
export interface Phone {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: string; // as string
  rating: string; // as string
  reviews: string; // as string
  in_stock: string | number; // "true"/"false"
  images: string[] | string;
  condition: string;
  color: string;
  storage: string;
  battery: string;
  city: string;
  description: string;
  seller_description: string;
  specs?: { [key: string]: string }[];
  created_at: string;
  updated_at: string;
}

// Initial state
const initialState: Phone[] = [];

// Create slice
export const phoneSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    addPhone: (state, action: PayloadAction<Phone>) => {
      state.push(action.payload);
    },
  },
});

export const { addPhone } = phoneSlice.actions;
export default phoneSlice.reducer;
