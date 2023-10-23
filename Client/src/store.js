import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import productReducer from './features/cart/productSlice';
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    product: productReducer,
  },
});


