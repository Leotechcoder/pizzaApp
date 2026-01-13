import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../shared/infrastructure/api/productApi";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {
    productUpdated(state, action) {
      const updated = action.payload;
      const index = state.items.findIndex((p) => p.id === updated.id);

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updated,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { productUpdated } = productSlice.actions;
export default productSlice.reducer;
