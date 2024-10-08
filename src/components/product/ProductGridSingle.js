import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";

const calculatePrices = (product, currencyRate) => {
  const basePrice = product.price * currencyRate;
  const discountPercentage = product.discountprice || 0; 
  const finalDiscountedPrice = discountPercentage
    ? basePrice * (1 - discountPercentage / 100) 
    : basePrice;
  return {
    basePrice: basePrice.toFixed(2),
    finalDiscountedPrice: finalDiscountedPrice.toFixed(2),
  };
};

const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const { basePrice, finalDiscountedPrice } = calculatePrices(
    product,
    currency.currencyRate
  );

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        price: +basePrice,
        discountprice: +finalDiscountedPrice,
      })
    );
  };


  const handleWhishList = (product) => {
    dispatch(
      addToWishlist({
        ...product,
        price: +basePrice, 
        discountprice: +finalDiscountedPrice, 
      })
    );
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
            <img
              className="default-img"
              src={product.Imageurl}
              alt={product.title}
              style={{height: "320px", width: "100%"}}
            />
          </Link>
          {product.discountprice && (
            <div className="product-img-badges">
              <span className="pink">-{product.discountprice}%</span>
              <span className="purple">Sale</span> 
            </div>
          )}
          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button onClick={() => handleWhishList(product)}>
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              <button onClick={() => handleAddToCart(product)}>
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
            <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
              {product.title}
            </Link>
          </h3>
          {product.review && product.review > 0 && (
            <div className="product-rating">
              <Rating ratingValue={product.review} />
            </div>
          )}
          <div className="product-price">
            {product.discountprice ? (
              <Fragment>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + basePrice}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + basePrice}</span>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={product.discountprice}
        finalProductPrice={+basePrice}
        finalDiscountedPrice={+finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  product: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  cartItem: PropTypes.object,
  wishlistItem: PropTypes.object,
  compareItem: PropTypes.object,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
