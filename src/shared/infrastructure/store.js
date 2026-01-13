// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../products/application/productSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
