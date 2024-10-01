// // // import { createSlice } from "@reduxjs/toolkit";
// // // import cogoToast from "cogo-toast";

// // // const initialState = {
// // //   cartItems: [], // Stores the cart items with their quantities
// // // };

// // // const cartSlice = createSlice({
// // //   name: "cart",
// // //   initialState,
// // //   reducers: {
// // //     // Add item to cart or update quantity if it already exists
// // //     addToCart: (state, action) => {
// // //       const item = action.payload;
// // //       const existingItem = state.cartItems.find(
// // //         (cartItem) => cartItem._id === item._id
// // //       );

// // //       if (existingItem) {
// // //         // If the item already exists, increase its quantity
// // //         existingItem.quantity += item.quantity || 1;
// // //         cogoToast.success(`${item.name} quantity increased in cart`, {
// // //           position: "bottom-left",
// // //         });
// // //       } else {
// // //         // If the item does not exist, add it to the cart with a quantity of 1 or the specified quantity
// // //         state.cartItems.push({ ...item, quantity: item.quantity || 1 });
// // //         cogoToast.success(`${item.name} added to cart`, {
// // //           position: "bottom-left",
// // //         });
// // //       }
// // //     },

// // //     // Increment the quantity of an item in the cart
// // //     incrementQuantity: (state, action) => {
// // //       const itemId = action.payload;
// // //       const existingItem = state.cartItems.find(
// // //         (cartItem) => cartItem._id === itemId
// // //       );
// // //       if (existingItem) {
// // //         existingItem.quantity += 1;
// // //         cogoToast.info(`Quantity increased for ${existingItem.name}`, {
// // //           position: "bottom-left",
// // //         });
// // //       }
// // //     },

// // //     // Decrease the quantity of an item in the cart
// // //     decreaseQuantity: (state, action) => {
// // //       const itemId = action.payload;
// // //       const existingItem = state.cartItems.find(
// // //         (cartItem) => cartItem._id === itemId
// // //       );

// // //       if (existingItem) {
// // //         // If the item exists and its quantity is more than 1, decrease the quantity
// // //         if (existingItem.quantity > 1) {
// // //           existingItem.quantity -= 1;
// // //           cogoToast.info(`Quantity decreased for ${existingItem.name}`, {
// // //             position: "bottom-left",
// // //           });
// // //         } else {
// // //           // If quantity is 1, remove the item from the cart
// // //           state.cartItems = state.cartItems.filter(
// // //             (cartItem) => cartItem._id !== itemId
// // //           );
// // //           cogoToast.error(`${existingItem.name} removed from cart`, {
// // //             position: "bottom-left",
// // //           });
// // //         }
// // //       }
// // //     },

// // //     // Remove an item completely from the cart
// // //     deleteFromCart: (state, action) => {
// // //       const itemId = action.payload;
// // //       const existingItem = state.cartItems.find(
// // //         (cartItem) => cartItem._id === itemId
// // //       );
// // //       if (existingItem) {
// // //         state.cartItems = state.cartItems.filter(
// // //           (cartItem) => cartItem._id !== itemId
// // //         );
// // //         cogoToast.error(`${existingItem.name} removed from cart`, {
// // //           position: "bottom-left",
// // //         });
// // //       }
// // //     },
// // //   },
// // // });

// // // // Export actions and reducer
// // // export const {
// // //   addToCart,
// // //   incrementQuantity,
// // //   decreaseQuantity,
// // //   deleteFromCart,
// // // } = cartSlice.actions;
// // // export default cartSlice.reducer;


// // import { createSlice } from "@reduxjs/toolkit";
// // import cogoToast from "cogo-toast";

// // const initialState = {
// //   cartItems: [], // Stores the cart items with their quantities
// // };

// // // Helper function to apply discount
// // const applyDiscount = (price, discountPrice) => {
// //   return price - discountPrice;
// // };

// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     // Add item to cart or update quantity if it already exists
// //     addToCart: (state, action) => {
// //       const item = action.payload; // Item structure based on provided data
// //       const existingItem = state.cartItems.find(
// //         (cartItem) => cartItem._id === item._id
// //       );

// //       // Calculate the discounted price
// //       const discountedPrice = applyDiscount(item.price, item.discountprice);

// //       if (existingItem) {
// //         // If the item already exists, increase its quantity
// //         existingItem.Quantity += Number(item.Quantity || 1); // Ensure quantity is a number
// //         cogoToast.success(`${item.title} quantity increased in cart`, {
// //           position: "bottom-left",
// //         });
// //       } else {
// //         // If the item does not exist, add it to the cart with a quantity of 1 or the specified quantity
// //         state.cartItems.push({
// //           _id: item._id,
// //           Imageurl: item.Imageurl,
// //           Quantity: Number(item.Quantity || 1), // Ensure quantity is a number
// //           description: item.description,
// //           discountprice: item.discountprice,
// //           newprice: item.newprice,
// //           price: item.price,
// //           review: item.review,
// //           sale: item.sale,
// //           title: item.title,
// //           discountedPrice, // Store the discounted price
// //         });
// //         cogoToast.success(`${item.title} added to cart`, {
// //           position: "bottom-left",
// //         });
// //       }
// //     },

// //     // Increment the quantity of an item in the cart
// //     incrementQuantity: (state, action) => {
// //       const itemId = action.payload;
// //       const existingItem = state.cartItems.find(
// //         (cartItem) => cartItem._id === itemId
// //       );
// //       if (existingItem) {
// //         existingItem.Quantity += 1;
// //         cogoToast.info(`Quantity increased for ${existingItem.title}`, {
// //           position: "bottom-left",
// //         });
// //       }
// //     },

// //     // Decrease the quantity of an item in the cart
// //     decreaseQuantity: (state, action) => {
// //       const itemId = action.payload;
// //       const existingItem = state.cartItems.find(
// //         (cartItem) => cartItem._id === itemId
// //       );

// //       if (existingItem) {
// //         // If the item exists and its quantity is more than 1, decrease the quantity
// //         if (existingItem.Quantity > 1) {
// //           existingItem.Quantity -= 1;
// //           cogoToast.info(`Quantity decreased for ${existingItem.title}`, {
// //             position: "bottom-left",
// //           });
// //         } else {
// //           // If quantity is 1, remove the item from the cart
// //           state.cartItems = state.cartItems.filter(
// //             (cartItem) => cartItem._id !== itemId
// //           );
// //           cogoToast.error(`${existingItem.title} removed from cart`, {
// //             position: "bottom-left",
// //           });
// //         }
// //       }
// //     },

// //     // Remove an item completely from the cart
// //     deleteFromCart: (state, action) => {
// //       const itemId = action.payload;
// //       const existingItem = state.cartItems.find(
// //         (cartItem) => cartItem._id === itemId
// //       );
// //       if (existingItem) {
// //         state.cartItems = state.cartItems.filter(
// //           (cartItem) => cartItem._id !== itemId
// //         );
// //         cogoToast.error(`${existingItem.title} removed from cart`, {
// //           position: "bottom-left",
// //         });
// //       }
// //     },
// //   },
// // });

// // // Export actions and reducer
// // export const {
// //   addToCart,
// //   incrementQuantity,
// //   decreaseQuantity,
// //   deleteFromCart,
// // } = cartSlice.actions;
// // export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import cogoToast from "cogo-toast";

// const initialState = {
//   cartItems: [], // Stores the cart items with their quantities
// };

// // Helper function to apply discount
// const applyDiscount = (price, discountPrice) => {
//   return discountPrice || price; // Return discount price if available, else original price
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
//         existingItem.Quantity += Number(item.Quantity || 1);
//         cogoToast.success(`${item.title} quantity increased in cart`, {
//           position: "bottom-left",
//         });
//       } else {
//         state.cartItems.push({ ...item, Quantity: Number(item.Quantity || 1) });
//         cogoToast.success(`${item.title} added to cart`, {
//           position: "bottom-left",
//         });
//       }
//     },

//     incrementQuantity: (state, action) => {
//       const itemId = action.payload;
//       const existingItem = state.cartItems.find(
//         (cartItem) => cartItem._id === itemId
//       );
//       if (existingItem) {
//         existingItem.Quantity += 1;
//         cogoToast.info(`Quantity increased for ${existingItem.title}`, {
//           position: "bottom-left",
//         });
//       }
//     },

//     decreaseQuantity: (state, action) => {
//       const itemId = action.payload;
//       const existingItem = state.cartItems.find(
//         (cartItem) => cartItem._id === itemId
//       );
//       if (existingItem) {
//         if (existingItem.Quantity > 1) {
//           existingItem.Quantity -= 1;
//           cogoToast.info(`Quantity decreased for ${existingItem.title}`, {
//             position: "bottom-left",
//           });
//         } else {
//           state.cartItems = state.cartItems.filter(
//             (cartItem) => cartItem._id !== itemId
//           );
//           cogoToast.error(`${existingItem.title} removed from cart`, {
//             position: "bottom-left",
//           });
//         }
//       }
//     },

//     deleteFromCart: (state, action) => {
//       const itemId = action.payload;
//       state.cartItems = state.cartItems.filter(
//         (cartItem) => cartItem._id !== itemId
//       );
//       cogoToast.error(`Item removed from cart`, {
//         position: "bottom-left",
//       });
//     },
//   },
// });

// export const {
//   addToCart,
//   incrementQuantity,
//   decreaseQuantity,
//   deleteFromCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";

const initialState = {
  cartItems: [], 
};

const applyDiscount = (price, discountPrice) => {
  return discountPrice || price;
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
        existingItem.Quantity += Number(item.quantity || 1);
        cogoToast.success(`${item.title} quantity increased in cart`, {
          position: "bottom-left",
        });
      } else {
        state.cartItems.push({ ...item, quantity: Number(item.quantity || 1) });
        cogoToast.success(`${item.title} added to cart`, {
          position: "bottom-left",
        });
      }
    },

    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === itemId
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
        cogoToast.info(`Quantity increased for ${existingItem.title}`, {
          position: "bottom-left",
        });
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === itemId
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          cogoToast.info(`Quantity decreased for ${existingItem.title}`, {
            position: "bottom-left",
          });
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem._id !== itemId
          );
          cogoToast.error(`${existingItem.title} removed from cart`, {
            position: "bottom-left",
          });
        }
      }
    },

    deleteFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== itemId
      );
      cogoToast.error(`Item removed from cart`, {
        position: "bottom-left",
      });
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decreaseQuantity,
  deleteFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
