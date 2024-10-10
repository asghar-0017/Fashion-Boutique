import { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ProductGridSingle from "../../components/product/ProductGridSingle";

const ProductGrid = ({ spaceBottomClass, category, type, limit }) => {
  const { products } = useSelector((state) => state.product);

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  // const prods = getProducts(products, category, type, limit);

  const filteredProducts =
    category && category !== "All"
      ? products.filter((product) => product.collection === category)
      : products;

      console.log(products);
      

  return (
    <Fragment>
      {filteredProducts?.length > 0 ? (
        filteredProducts.map((product) => {
          return (
            <div
              className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
              key={product._id}
            >
              <ProductGridSingle
                spaceBottomClass={spaceBottomClass}
                product={product}
                currency={currency}
                cartItem={cartItems.find(
                  (cartItem) => cartItem.id === product.id
                )}
                wishlistItem={wishlistItems.find(
                  (wishlistItem) => wishlistItem.id === product.id
                )}
                compareItem={compareItems.find(
                  (compareItem) => compareItem.id === product.id
                )}
              />
            </div>
          );
        })
      ) : (
        <div>No products found.</div>
      )}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGrid;
