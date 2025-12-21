import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Type definition
export interface Activity {
  id: string;
  activityName: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Initial state
const initialState: Activity[] = [];

// Slice
export const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivity: (state, action: PayloadAction<Activity[]>) => {
      state.push(...action.payload);
    },
  },
});

export const { setActivity } = activitySlice.actions;
export default activitySlice.reducer;
