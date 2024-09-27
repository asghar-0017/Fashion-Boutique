import cogoToast from 'cogo-toast';
const { createSlice } = require('@reduxjs/toolkit');

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compareItems: []
  },
  reducers: {
    addToCompare(state, action) {
      const item = state.compareItems.find(item => item.id === action.payload.id);
      if (!item) {
        state.compareItems.push(action.payload);
        cogoToast.success("Added To Compare", { position: "bottom-left" });
      } else {
        cogoToast.info("Product already in Compare", { position: "bottom-left" });
      }
    },
    deleteFromCompare(state, action) {
      state.compareItems = state.compareItems.filter(item => item.id !== action.payload);
      cogoToast.error("Removed From Compare", { position: "bottom-left" });
    }
  },
});

export const { addToCompare, deleteFromCompare } = compareSlice.actions;
export default compareSlice.reducer;
