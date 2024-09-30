// export const getProducts = (products, type, limit) => {
//   // Check if products is an array to prevent errors
//   console.log(products);

//   if (!Array.isArray(products)) {
//     console.error("Expected products to be an array but received:", products);
//     return []; // Return an empty array if products is not valid
//   }

//   // Default return: all products with applied limit
//   return products.slice(0, limit ? limit : products.length);
// };




// // get product discount price
// export const getDiscountPrice = (price, discountprice) => {
//   return discountprice && discountprice > 0 ? price - price * (discountprice / 100) : null;
// };

// // get product cart quantity
// export const getProductCartQuantity = (cartItems, product, color, size) => {
//   let productInCart = cartItems.find(
//     single =>
//       single.id === product.id &&
//       (single.selectedProductColor
//         ? single.selectedProductColor === color
//         : true) &&
//       (single.selectedProductSize ? single.selectedProductSize === size : true)
//   );
//   if (cartItems.length >= 1 && productInCart) {
//     if (product.variation) {
//       return cartItems.find(
//         single =>
//           single.id === product.id &&
//           single.selectedProductColor === color &&
//           single.selectedProductSize === size
//       ).quantity;
//     } else {
//       return cartItems.find(single => product.id === single.id).quantity;
//     }
//   } else {
//     return 0;
//   }
// };

// export const cartItemStock = (item, color, size) => {
//   if (item.stock) {
//     return item.stock;
//   } else {
//     return item.variation
//       .filter(single => single.color === color)[0]
//       .size.filter(single => single.name === size)[0].stock;
//   }
// };

// //get products based on category
// export const getSortedProducts = (products, sortType, sortValue) => {
//   if (products && sortType && sortValue) {
//     if (sortType === "category") {
//       return products.filter(
//         product => product.category.filter(single => single === sortValue)[0]
//       );
//     }
//     if (sortType === "tag") {
//       return products.filter(
//         product => product.tag.filter(single => single === sortValue)[0]
//       );
//     }
//     if (sortType === "color") {
//       return products.filter(
//         product =>
//           product.variation &&
//           product.variation.filter(single => single.color === sortValue)[0]
//       );
//     }
//     if (sortType === "size") {
//       return products.filter(
//         product =>
//           product.variation &&
//           product.variation.filter(
//             single => single.size.filter(single => single.name === sortValue)[0]
//           )[0]
//       );
//     }
//     if (sortType === "filterSort") {
//       let sortProducts = [...products];
//       if (sortValue === "default") {
//         return sortProducts;
//       }
//       if (sortValue === "priceHighToLow") {
//         return sortProducts.sort((a, b) => {
//           return b.price - a.price;
//         });
//       }
//       if (sortValue === "priceLowToHigh") {
//         return sortProducts.sort((a, b) => {
//           return a.price - b.price;
//         });
//       }
//     }
//   }
//   return products;
// };

// // get individual element
// const getIndividualItemArray = array => {
//   let individualItemArray = array.filter(function(v, i, self) {
//     return i === self.indexOf(v);
//   });
//   return individualItemArray;
// };

// // get individual categories
// export const getIndividualCategories = products => {
//   let productCategories = [];
//   products &&
//     products.map(product => {
//       return (
//         product.category &&
//         product.category.map(single => {
//           return productCategories.push(single);
//         })
//       );
//     });
//   const individualProductCategories = getIndividualItemArray(productCategories);
//   return individualProductCategories;
// };

// // get individual tags
// export const getIndividualTags = products => {
//   let productTags = [];
//   products &&
//     products.map(product => {
//       return (
//         product.tag &&
//         product.tag.map(single => {
//           return productTags.push(single);
//         })
//       );
//     });
//   const individualProductTags = getIndividualItemArray(productTags);
//   return individualProductTags;
// };

// // get individual colors
// export const getIndividualColors = products => {
//   let productColors = [];
//   products &&
//     products.map(product => {
//       return (
//         product.variation &&
//         product.variation.map(single => {
//           return productColors.push(single.color);
//         })
//       );
//     });
//   const individualProductColors = getIndividualItemArray(productColors);
//   return individualProductColors;
// };

// // get individual sizes
// export const getProductsIndividualSizes = products => {
//   let productSizes = [];
//   products &&
//     products.map(product => {
//       return (
//         product.variation &&
//         product.variation.map(single => {
//           return single.size.map(single => {
//             return productSizes.push(single.name);
//           });
//         })
//       );
//     });
//   const individualProductSizes = getIndividualItemArray(productSizes);
//   return individualProductSizes;
// };

// // get product individual sizes
// export const getIndividualSizes = product => {
//   let productSizes = [];
//   product.variation &&
//     product.variation.map(singleVariation => {
//       return (
//         singleVariation.size &&
//         singleVariation.size.map(singleSize => {
//           return productSizes.push(singleSize.name);
//         })
//       );
//     });
//   const individualSizes = getIndividualItemArray(productSizes);
//   return individualSizes;
// };

// export const setActiveSort = e => {
//   const filterButtons = document.querySelectorAll(
//     ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
//   );
//   filterButtons.forEach(item => {
//     item.classList.remove("active");
//   });
//   e.currentTarget.classList.add("active");
// };

// export const setActiveLayout = e => {
//   const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
//   gridSwitchBtn.forEach(item => {
//     item.classList.remove("active");
//   });
//   e.currentTarget.classList.add("active");
// };

// export const toggleShopTopFilter = e => {
//   const shopTopFilterWrapper = document.querySelector(
//     "#product-filter-wrapper"
//   );
//   shopTopFilterWrapper.classList.toggle("active");
//   if (shopTopFilterWrapper.style.height) {
//     shopTopFilterWrapper.style.height = null;
//   } else {
//     shopTopFilterWrapper.style.height =
//       shopTopFilterWrapper.scrollHeight + "px";
//   }
//   e.currentTarget.classList.toggle("active");
// };

// Get a subset of products with an optional limit
export const getProducts = (products, type, limit) => {
  console.log(products); // Debug log for products

  // Check if products is an array to prevent errors
  if (!Array.isArray(products)) {
    console.error("Expected products to be an array but received:", products);
    return []; // Return an empty array if products is not valid
  }

  // Default return: all products with applied limit
  return products.slice(0, limit || products.length);
};

// Get product discount price
export const getDiscountPrice = (price, discountPrice) => {
  return discountPrice > 0 ? price - price * (discountPrice / 100) : price;
};

// Get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  const productInCart = cartItems.find(single =>
    single.id === product.id &&
    (single.selectedProductColor ? single.selectedProductColor === color : true) &&
    (single.selectedProductSize ? single.selectedProductSize === size : true)
  );

  return productInCart ? productInCart.quantity : 0; // Return quantity if found, else 0
};

// Get stock for an item based on color and size
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  }

  const colorVariation = item.variation.find(single => single.color === color);
  const sizeVariation = colorVariation.size.find(single => single.name === size);
  
  return sizeVariation ? sizeVariation.stock : 0; // Return stock or 0 if not found
};

// Get products based on category or other filters
export const getSortedProducts = (products, sortType, sortValue) => {
  if (!products || !sortType || !sortValue) return products;

  const sortByCategory = product => product.category?.includes(sortValue);
  const sortByTag = product => product.tag?.includes(sortValue);
  const sortByColor = product => product.variation?.some(single => single.color === sortValue);
  const sortBySize = product => product.variation?.some(single => single.size.some(size => size.name === sortValue));

  let sortedProducts;

  switch (sortType) {
    case "category":
      sortedProducts = products.filter(sortByCategory);
      break;
    case "tag":
      sortedProducts = products.filter(sortByTag);
      break;
    case "color":
      sortedProducts = products.filter(sortByColor);
      break;
    case "size":
      sortedProducts = products.filter(sortBySize);
      break;
    case "filterSort":
      sortedProducts = [...products];
      if (sortValue === "priceHighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortValue === "priceLowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else {
        return sortedProducts; // Return unsorted for 'default'
      }
      break;
    default:
      sortedProducts = products;
  }

  return sortedProducts;
};

// Get unique elements from an array
const getIndividualItemArray = array => {
  return [...new Set(array)];
};

// Get individual categories
export const getIndividualCategories = products => {
  const productCategories = products.flatMap(product => product.category || []);
  return getIndividualItemArray(productCategories);
};

// Get individual tags
export const getIndividualTags = products => {
  const productTags = products.flatMap(product => product.tag || []);
  return getIndividualItemArray(productTags);
};

// Get individual colors
export const getIndividualColors = products => {
  const productColors = products.flatMap(product =>
    product.variation?.map(single => single.color) || []
  );
  return getIndividualItemArray(productColors);
};

// Get individual sizes
export const getProductsIndividualSizes = products => {
  const productSizes = products.flatMap(product =>
    product.variation?.flatMap(single => single.size.map(size => size.name)) || []
  );
  return getIndividualItemArray(productSizes);
};

// Get individual sizes from a product
export const getIndividualSizes = product => {
  const productSizes = product.variation?.flatMap(singleVariation =>
    singleVariation.size?.map(singleSize => singleSize.name) || []
  );
  return getIndividualItemArray(productSizes);
};

// Set active sort button
export const setActiveSort = e => {
  document.querySelectorAll(".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button")
    .forEach(item => item.classList.remove("active"));
  e.currentTarget.classList.add("active");
};

// Set active layout button
export const setActiveLayout = e => {
  document.querySelectorAll(".shop-tab button")
    .forEach(item => item.classList.remove("active"));
  e.currentTarget.classList.add("active");
};

// Toggle visibility of the shop top filter
export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector("#product-filter-wrapper");
  shopTopFilterWrapper.classList.toggle("active");
  shopTopFilterWrapper.style.height = shopTopFilterWrapper.style.height ? null : shopTopFilterWrapper.scrollHeight + "px";
  e.currentTarget.classList.toggle("active");
};
