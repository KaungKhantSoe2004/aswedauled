import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Faq {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

const initialState: Faq[] = [];
export const FaqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFaq: (state, action: PayloadAction<Faq[]>) => {
      state.push(...action.payload);
     
    },
  },
});

export default FaqSlice.reducer;
export const { setFaq } = FaqSlice.actions;
