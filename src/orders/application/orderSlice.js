import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../infrastructure/orderApi";

/* ===========================
   THUNKS
=========================== */

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderPayload, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(orderPayload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.order || "Error creando la orden"
      );
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error obteniendo órdenes"
      );
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrder(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error actualizando la orden"
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await orderApi.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error eliminando la orden"
      );
    }
  }
);

/* ===========================
   SLICE
=========================== */

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],           // para dashboard
    currentOrder: null, // última orden creada desde la tienda
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE ORDER ===== */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
        state.list.unshift(action.payload.order); // la agregamos arriba del todo
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== GET ORDERS ===== */
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ORDER ===== */
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.list.findIndex((o) => o.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }

        if (state.currentOrder?.id === updated.id) {
          state.currentOrder = updated;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ORDER ===== */
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.list = state.list.filter((o) => o.id !== id);

        if (state.currentOrder?.id === id) {
          state.currentOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const {
  clearCurrentOrder,
  setCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
