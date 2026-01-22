// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../products/application/productSlice.js";
import cartReducer from "../../orders/application/cartSlice.js";
import orderReducer from "../../orders/application/orderSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
