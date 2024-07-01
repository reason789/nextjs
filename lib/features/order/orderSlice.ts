import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks

// Create a new order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.foodvela.com/api/v1/order/new', orderData);
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Order Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.successMessage = 'Order placed successfully';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
