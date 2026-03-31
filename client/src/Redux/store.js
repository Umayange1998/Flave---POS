import { configureStore } from "@reduxjs/toolkit";
import cutomerSlice from "./Slices/cutomerSlice";

const store = configureStore({
  reducer: {
    customer: cutomerSlice,
  },

  devTools: import.meta.env.NODE_ENV !== "production",
});
export default store;
