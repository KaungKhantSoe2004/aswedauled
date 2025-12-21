import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Type definition
export interface gallery {
  id: string;
  galleryName: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Initial state
const initialState: gallery[] = [];

// Create slice
export const gallerySlice = createSlice({
  name: "galleries",
  initialState,
  reducers: {
    setGallery: (state, action: PayloadAction<gallery[]>) => {
      console.log(action.payload);
      state.push(...action.payload);
    },
  },
});

export const { setGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
