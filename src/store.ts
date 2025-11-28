import { configureStore } from "@reduxjs/toolkit";
import BikeReducer from "./features/bikeSlice";
import PhoneReducer from "./features/phoneSlice";
import FavCountReducer from "./features/favCountSlice";
import BicycleReducer from "./features/bicycleSlice";
export const store = configureStore({
  reducer: {
    bikes: BikeReducer,
    phones: PhoneReducer,
    bicycles: BicycleReducer,
    counts: FavCountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
