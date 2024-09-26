import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import axios from "axios"; // Add axios for API request

const ProductGridSingle = ({ currency, spaceBottomClass }) => {
  const [products, setProducts] = useState([]); // State to hold product array
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  // Fetch product data from API
  useEffect(() => {
    axios
      .get("http://localhost:3001/get-product") // Call the API
      .then((response) => {
        setProducts(response.data.data); // Set product data from response (array)
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  if (!products.length) {
    return <div>Loading...</div>; // Display loading state until product data is fetched
  }

  return (
    <Fragment>
      {products.map((product) => {
        const discountedPrice = product.discountprice;
        const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
        const finalDiscountedPrice = discountedPrice
          ? +(discountedPrice * currency.currencyRate).toFixed(2)
          : null;

        return (
          <div key={product._id} className={clsx("product-wrap", spaceBottomClass)}>
            <div className="product-img">
              <Link to={process.env.PUBLIC_URL + "/product/" + product._id}>
                <img
                  className="default-img"
                  src={product.Imageurl}
                  alt={product.title}
                />
              </Link>
              {product.sale ? (
                <div className="product-img-badges">
                  {product.discountprice ? (
                    <span className="pink">-{product.discountprice}%</span>
                  ) : (
                    ""
                  )}
                  {product.sale ? <span className="purple">Sale</span> : ""}
                </div>
              ) : (
                ""
              )}

              <div className="product-action">
                <div className="pro-same-action pro-wishlist">
                  <button
                    onClick={() => dispatch(addToWishlist(product))}
                  >
                    <i className="pe-7s-like" />
                  </button>
                </div>
                <div className="pro-same-action pro-cart">
                  <button
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <i className="pe-7s-cart"></i> Add to cart
                  </button>
                </div>
                <div className="pro-same-action pro-quickview">
                  <button title="Quick View" onClick={() => setModalShow(true)}>
                    <i className="pe-7s-look" />
                  </button>
                </div>
              </div>
            </div>
            <div className="product-content text-center">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product._id}>
                  {product.title}
                </Link>
              </h3>
              {product.review && product.review > 0 ? (
                <div className="product-rating">
                  <Rating ratingValue={product.review} />
                </div>
              ) : (
                ""
              )}
              <div className="product-price">
                {finalDiscountedPrice !== null ? (
                  <Fragment>
                    <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                    <span className="old">
                      {currency.currencySymbol + finalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div>
            </div>
            {/* product modal */}
            <ProductModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              product={product}
              currency={currency}
              discountedPrice={discountedPrice}
              finalProductPrice={finalProductPrice}
              finalDiscountedPrice={finalDiscountedPrice}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  currency: PropTypes.shape({
    currencyRate: PropTypes.number,
    currencySymbol: PropTypes.string
  }),
  spaceBottomClass: PropTypes.string
};

export default ProductGridSingle;