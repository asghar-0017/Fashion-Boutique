import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        existingItem.Quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item, Quantity: item.quantity });
      }
    },
    decreaseQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem && existingItem.Quantity > 1) {
        existingItem.Quantity -= 1;
      } else if (existingItem.Quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
      }
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );
    },
  },
});

export const { addToCart, decreaseQuantity, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
