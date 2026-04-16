import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.find((item) => item.name === action.payload.name);

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    increaseItem: (state, action) => {
      const item = state.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    removeItem: (state, action) => {
      const index = state.findIndex((i) => i.id === action.payload);

      if (index !== -1) {
        const item = state[index];

        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const getTotalPrice = (state) =>
  state.cart.reduce(
    (total, item) => total + item.pricePerQnt * item.quantity,
    0,
  );
export const { addItem, decreaseItem, removeItem, increaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;
