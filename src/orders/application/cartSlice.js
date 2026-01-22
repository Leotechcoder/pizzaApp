import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = {
        ...action.payload,
        cartId: Date.now(),
        quantity: action.payload.quantity || 1,
      };

      state.items.push(item);
      state.total += item.price * item.quantity;
    },
    removeItemFromCart: (state, action) => {
      const cartId = action.payload;
      const item = state.items.find((i) => i.cartId === cartId);

      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.cartId !== cartId);
      }
    },
    editCartItem: (state, action) => {
      const edited = action.payload;
      const index = state.items.findIndex(
        (i) => i.cartId === edited.cartId
      );

      if (index !== -1) {
        const prev = state.items[index];
        state.total -= prev.price * prev.quantity;
        state.items[index] = edited;
        state.total += edited.price * edited.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  editCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
