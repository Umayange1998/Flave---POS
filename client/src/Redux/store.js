import { configureStore } from "@reduxjs/toolkit";
import cutomerSlice from "./Slices/cutomerSlice";
import cartSlice from "./Slices/cartSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    customer: cutomerSlice,
    cart: cartSlice,
    user: userSlice,
  },

  devTools: import.meta.env.NODE_ENV !== "production",
});
export default store;
