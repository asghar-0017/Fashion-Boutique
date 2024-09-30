// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [], // Stores the cart items with their quantities
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Add item to cart or update quantity if it already exists
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cartItems.find(
//         (cartItem) => cartItem._id === item._id
//       );
      
//       if (existingItem) {
//         // If the item already exists, increase its quantity
//         existingItem.Quantity += item.quantity || 1;
//       } else {
//         // If the item does not exist, add it to the cart with a quantity of 1 or the specified quantity
//         state.cartItems.push({ ...item, Quantity: item.quantity || 1 });
//       }
//     },

//     // Decrease the quantity of an item in the cart
//     decreaseQuantity: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cartItems.find(
//         (cartItem) => cartItem._id === item._id
//       );

//       if (existingItem) {
//         // If the item exists and its quantity is more than 1, decrease the quantity
//         if (existingItem.Quantity > 1) {
//           existingItem.Quantity -= 1;
//         } else {
//           // If quantity is 1, remove the item from the cart
//           state.cartItems = state.cartItems.filter(
//             (cartItem) => cartItem._id !== item._id
//           );
//         }
//       }
//     },

//     // Remove an item completely from the cart
//     deleteFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (cartItem) => cartItem._id !== action.payload
//       );
//     },
//   },
// });

// export const { addToCart, decreaseQuantity, deleteFromCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import cogoToast from "cogo-toast";

// const initialState = {
//   cartItems: [], // Stores the cart items with their quantities
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Add item to cart or update quantity if it already exists
//     addToCart: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cartItems.find(
//         (cartItem) => cartItem._id === item._id
//       );

//       if (existingItem) {
//         // If the item already exists, increase its quantity
//         existingItem.Quantity += item.quantity || 1;
//         cogoToast.success(`${item.name} quantity increased in cart`, { position: "bottom-left" });
//       } else {
//         // If the item does not exist, add it to the cart with a quantity of 1 or the specified quantity
//         state.cartItems.push({ ...item, Quantity: item.quantity || 1 });
//         cogoToast.success(`${item.name} added to cart`, { position: "bottom-left" });
//       }
//     },

//     // Decrease the quantity of an item in the cart
//     decreaseQuantity: (state, action) => {
//       const item = action.payload;
//       const existingItem = state.cartItems.find(
//         (cartItem) => cartItem._id === item._id
//       );

//       if (existingItem) {
//         // If the item exists and its quantity is more than 1, decrease the quantity
//         if (existingItem.Quantity > 1) {
//           existingItem.Quantity -= 1;
//           cogoToast.info(`${item.name} quantity decreased in cart`, { position: "bottom-left" });
//         } else {
//           // If quantity is 1, remove the item from the cart
//           state.cartItems = state.cartItems.filter(
//             (cartItem) => cartItem._id !== item._id
//           );
//           cogoToast.error(`${item.name} removed from cart`, { position: "bottom-left" });
//         }
//       }
//     },

//     // Remove an item completely from the cart
//     deleteFromCart: (state, action) => {
//       const itemId = action.payload;
//       const existingItem = state.cartItems.find(cartItem => cartItem._id === itemId);
//       if (existingItem) {
//         state.cartItems = state.cartItems.filter(
//           (cartItem) => cartItem._id !== itemId
//         );
//         cogoToast.error(`${existingItem.name} removed from cart`, { position: "bottom-left" });
//       }
//     },
//   },
// });

// // Export actions and reducer
// export const { addToCart, decreaseQuantity, deleteFromCart } = cartSlice.actions;
// export default cartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";

const initialState = {
  cartItems: [], // Stores the cart items with their quantities
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or update quantity if it already exists
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.Quantity += item.quantity || 1;
        cogoToast.success(`${item.name} quantity increased in cart`, { position: "bottom-left" });
      } else {
        // If the item does not exist, add it to the cart with a quantity of 1 or the specified quantity
        state.cartItems.push({ ...item, Quantity: item.quantity || 1 });
        cogoToast.success(`${item.name} added to cart`, { position: "bottom-left" });
      }
    },

    // Increment the quantity of an item in the cart
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem._id === itemId);
      if (existingItem) {
        existingItem.Quantity += 1;
        cogoToast.info(`Quantity increased for ${existingItem.name}`, { position: "bottom-left" });
      }
    },

    // Decrease the quantity of an item in the cart
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem._id === itemId);

      if (existingItem) {
        // If the item exists and its quantity is more than 1, decrease the quantity
        if (existingItem.Quantity > 1) {
          existingItem.Quantity -= 1;
          cogoToast.info(`Quantity decreased for ${existingItem.name}`, { position: "bottom-left" });
        } else {
          // If quantity is 1, remove the item from the cart
          state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== itemId);
          cogoToast.error(`${existingItem.name} removed from cart`, { position: "bottom-left" });
        }
      }
    },

    // Remove an item completely from the cart
    deleteFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem._id === itemId);
      if (existingItem) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== itemId);
        cogoToast.error(`${existingItem.name} removed from cart`, { position: "bottom-left" });
      }
    },
  },
});

// Export actions and reducer
export const { addToCart, incrementQuantity, decreaseQuantity, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
