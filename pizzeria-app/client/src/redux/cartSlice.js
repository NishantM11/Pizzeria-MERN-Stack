import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      
      state.totalPrice = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.totalPrice = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item._id !== _id);
        } else {
          item.quantity = quantity;
        }
      }
      
      state.totalPrice = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
