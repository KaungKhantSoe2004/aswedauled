
import { configureStore } from "@reduxjs/toolkit";
import FaqSlice from "./features/faqSlice";
import activitySlice from "./features/activitySlice";
import gallerySlice from "./features/gallerySlice";

export const store = configureStore({
  reducer: {
    faqs: FaqSlice,
    activities: activitySlice,
    galleries: gallerySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
