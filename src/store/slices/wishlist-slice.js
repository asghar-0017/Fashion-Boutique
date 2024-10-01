import { createSlice } from '@reduxjs/toolkit';
import cogoToast from 'cogo-toast';

const applyDiscount = (price, discountPercentage) => {
  return price - (price * discountPercentage / 100);
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: []
  },
  reducers: {
    addToWishlist(state, action) {
      const { _id, price, discountPrice, title } = action.payload;

      const isInWishlist = state.wishlistItems.find(item => item._id === _id);

      const discount = discountPrice || 0;
      const discountedPrice = applyDiscount(price, discount);

      if (!isInWishlist) {
        state.wishlistItems.push({ ...action.payload, discountedPrice });
        cogoToast.success(`${title} added to Wishlist at ₨${discountedPrice}`, { position: "bottom-left" });
      } else {
        cogoToast.info(`${title} is already in your Wishlist`, { position: "bottom-left" });
      }
    },
    deleteAllFromWishlist(state, action) {
      const itemId = action.payload;
      const item = state.wishlistItems.find(item => item.id === itemId);
      
      if (item) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== itemId);
        cogoToast.error(`${item.title} removed from Wishlist`, { position: "bottom-left" });
      }
    },
    deleteFromWishlist(state, action) {
      const itemId = action.payload; 
      const itemIndex = state.wishlistItems.findIndex(item => item.id === itemId);

      console.log(itemIndex);
      
      
      if (itemIndex !== -1) { 
        const item = state.wishlistItems[itemIndex]; 
        state.wishlistItems.splice(itemIndex, 1); 
        cogoToast.error(`${item.title} removed from Wishlist`, { position: "bottom-left" });
      } else {
        cogoToast.info(`Item not found in Wishlist`, { position: "bottom-left" });
      }
    }
    
  },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
