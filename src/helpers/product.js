export const getProducts = (products, type, limit) => {
  console.log(products); 

  if (!Array.isArray(products)) {
    console.error("Expected products to be an array but received:", products);
    return [];
  }
  return products.slice(0, limit || products.length);
};

export const getDiscountPrice = (price, discountPrice) => {
  return discountPrice > 0 ? price - price * (discountPrice / 100) : price;
};

export const getProductCartQuantity = (cartItems, product, color, size) => {
  const productInCart = cartItems.find(single =>
    single.id === product.id &&
    (single.selectedProductColor ? single.selectedProductColor === color : true) &&
    (single.selectedProductSize ? single.selectedProductSize === size : true)
  );

  return productInCart ? productInCart.quantity : 0; 
};

export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  }

  const colorVariation = item.variation.find(single => single.color === color);
  const sizeVariation = colorVariation.size.find(single => single.name === size);
  
  return sizeVariation ? sizeVariation.stock : 0;
};

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
        return sortedProducts; 
      }
      break;
    default:
      sortedProducts = products;
  }

  return sortedProducts;
};

const getIndividualItemArray = array => {
  return [...new Set(array)];
};

export const getIndividualCategories = products => {
  const productCategories = products.flatMap(product => product.category || []);
  return getIndividualItemArray(productCategories);
};

export const getIndividualTags = products => {
  const productTags = products.flatMap(product => product.tag || []);
  return getIndividualItemArray(productTags);
};

export const getIndividualColors = products => {
  const productColors = products.flatMap(product =>
    product.variation?.map(single => single.color) || []
  );
  return getIndividualItemArray(productColors);
};

export const getProductsIndividualSizes = products => {
  const productSizes = products.flatMap(product =>
    product.variation?.flatMap(single => single.size.map(size => size.name)) || []
  );
  return getIndividualItemArray(productSizes);
};

export const getIndividualSizes = product => {
  const productSizes = product.variation?.flatMap(singleVariation =>
    singleVariation.size?.map(singleSize => singleSize.name) || []
  );
  return getIndividualItemArray(productSizes);
};

export const setActiveSort = e => {
  document.querySelectorAll(".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button")
    .forEach(item => item.classList.remove("active"));
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  document.querySelectorAll(".shop-tab button")
    .forEach(item => item.classList.remove("active"));
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector("#product-filter-wrapper");
  shopTopFilterWrapper.classList.toggle("active");
  shopTopFilterWrapper.style.height = shopTopFilterWrapper.style.height ? null : shopTopFilterWrapper.scrollHeight + "px";
  e.currentTarget.classList.toggle("active");
};
