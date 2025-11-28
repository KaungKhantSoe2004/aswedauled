import { createSlice } from "@reduxjs/toolkit";
import { getTotalFavCount } from "./favSlice";
interface CountS {
  totalCount: number;
}
const ogLength: number = Number(getTotalFavCount());
const initialState: CountS = { totalCount: ogLength };
export const FavCountSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    setCount: (state) => {
      state.totalCount += 1;
    },
    removeCount: (state) => {
      if (state.totalCount <= 0) {
        state.totalCount = 0;
        return;
      } else {
        state.totalCount -= 1;
      }
    },
    clearCount: (state) => {
      state.totalCount = 0;
    },
  },
});
export const { setCount, removeCount, clearCount } = FavCountSlice.actions;
export default FavCountSlice.reducer;
