import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const dispatch = useDispatch();

  // Set default color and size from product API data, assuming 'variation' exists.
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variations && product.variations.length > 0 ? product.variations[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variations && product.variations.length > 0 ? product.variations[0].sizes[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variations && product.variations.length > 0 ? product.variations[0].sizes[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  // Get cart quantity based on the selected color and size
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
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

      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      {product.variations && product.variations.length > 0 ? (
        <div className="pro-details-size-color">
          {/* Color Options */}
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variations.map((single, key) => (
                <label
                  className={`pro-details-color-content--single ${single.color}`}
                  key={key}
                >
                  <input
                    type="radio"
                    value={single.color}
                    name="product-color"
                    checked={single.color === selectedProductColor ? "checked" : ""}
                    onChange={() => {
                      setSelectedProductColor(single.color);
                      setSelectedProductSize(single.sizes[0].name);
                      setProductStock(single.sizes[0].stock);
                      setQuantityCount(1);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variations.map((single) => (
                single.color === selectedProductColor &&
                  single.sizes.map((singleSize, key) => (
                    <label
                      className={`pro-details-size-content--single`}
                      key={key}
                    >
                      <input
                        type="radio"
                        value={singleSize.name}
                        checked={singleSize.name === selectedProductSize ? "checked" : ""}
                        onChange={() => {
                          setSelectedProductSize(singleSize.name);
                          setProductStock(singleSize.stock);
                          setQuantityCount(1);
                        }}
                      />
                      <span className="size-name">{singleSize.name}</span>
                    </label>
                  ))
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Affiliate Link */}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          {/* Quantity Controls */}
          <div className="cart-plus-minus">
            <button
              onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)}
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...product,
                      quantity: quantityCount,
                      selectedProductColor: selectedProductColor,
                      selectedProductSize: selectedProductSize,
                    })
                  )
                }
                disabled={productCartQty >= productStock}
              >
                Add To Cart
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>

          {/* Wishlist and Compare Buttons */}
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}

      {/* Product Categories */}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => (
              <li key={key}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {single}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* Product Tags */}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => (
              <li key={key}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {single}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* Social Media Links */}
      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
