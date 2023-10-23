// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: { orderId: null },
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { setOrderId } = productSlice.actions;

export default productSlice.reducer;
