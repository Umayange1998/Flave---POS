import { configureStore } from "@reduxjs/toolkit";
import cutomerSlice from "./Slices/cutomerSlice";
import cartSlice from "./Slices/cartSlice";

const store = configureStore({
  reducer: {
    customer: cutomerSlice,
    cart: cartSlice,
  },

  devTools: import.meta.env.NODE_ENV !== "production",
});
export default store;
