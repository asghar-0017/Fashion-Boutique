import cogoToast from 'cogo-toast';
const { createSlice } = require('@reduxjs/toolkit');

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: []
  },
  reducers: {
    addToWishlist(state, action) {
      const isInWishlist = state.wishlistItems.find(item => item.id === action.payload.id);
      if (!isInWishlist) {
        state.wishlistItems.push(action.payload);
        cogoToast.success("Added To Wishlist", { position: "bottom-left" });
      } else {
        cogoToast.info("Product already in Wishlist", { position: "bottom-left" });
      }
    },
    deleteFromWishlist(state, action) {
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
      cogoToast.error("Removed From Wishlist", { position: "bottom-left" });
    },
    deleteAllFromWishlist(state) {
      state.wishlistItems = [];
    }
  },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
