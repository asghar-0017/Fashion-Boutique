import { createSlice } from '@reduxjs/toolkit';
import cogoToast from 'cogo-toast';

// Helper function to apply discount
const applyDiscount = (price, discountPercentage) => {
  return price - (price * discountPercentage / 100);
};

// Wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: []
  },
  reducers: {
    addToWishlist(state, action) {
      const isInWishlist = state.wishlistItems.find(item => item.id === action.payload.id);
      
      // Apply discount before adding to wishlist
      const discount = action.payload.discountPercentage || 0;
      const discountedPrice = applyDiscount(action.payload.price, discount);

      if (!isInWishlist) {
        state.wishlistItems.push({ ...action.payload, discountedPrice });
        cogoToast.success(`${action.payload.title} added to Wishlist at ₨${discountedPrice}`, { position: "bottom-left" });
      } else {
        cogoToast.info(`${action.payload.title} is already in your Wishlist`, { position: "bottom-left" });
      }
    },
    deleteFromWishlist(state, action) {
      const itemId = action.payload;
      const item = state.wishlistItems.find(item => item.id === itemId);
      
      if (item) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== itemId);
        cogoToast.error(`${item.title} removed from Wishlist`, { position: "bottom-left" });
      }
    },
    deleteAllFromWishlist(state) {
      // Confirm before clearing wishlist
      const confirmed = window.confirm("Are you sure you want to clear your entire Wishlist?");
      if (confirmed) {
        state.wishlistItems = [];
        cogoToast.success("Your Wishlist has been cleared.", { position: "bottom-left" });
      } else {
        cogoToast.info("Wishlist clearance cancelled", { position: "bottom-left" });
      }
    }
  },
});

// Export actions and reducer
export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
