import { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";

const ProductGrid = ({
  spaceBottomClass,
  category,
  type,
  limit
}) => {
  // Extract products from Redux state
  const { products } = useSelector((state) => state.product);
  
  // Log products to ensure you are receiving them
  console.log("Products from Redux:", products);
  
  // Other states
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  
  // Get filtered products based on category and type
  const prods = getProducts(products, category, type, limit);
  console.log(products);
  
  
  return (
    <Fragment>
      {/* Check if products exist before mapping */}
      {products?.length > 0 ? (
        products.map(product => {
          return (
            <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6" key={product._id}> {/* Ensure to use correct key */}
              <ProductGridSingle
                spaceBottomClass={spaceBottomClass}
                product={product}
                currency={currency}
                cartItem={cartItems.find(cartItem => cartItem.id === product.id)}
                wishlistItem={wishlistItems.find(wishlistItem => wishlistItem.id === product.id)}
                compareItem={compareItems.find(compareItem => compareItem.id === product.id)}
              />
            </div>
          );
        })
      ) : (
        <div>No products found.</div> // Display message if no products are available
      )}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};

export default ProductGrid;
