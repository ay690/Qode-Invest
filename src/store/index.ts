import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import portfolioReducer from "./slices/portfolioSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
