import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variations && product.variations.length > 0 ? product.variations[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variations && product.variations.length > 0 ? product.variations[0].sizes[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variations && product.variations.length > 0 ? product.variations[0].sizes[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1); // Initialize to 1

  // Get cart quantity based on the selected color and size
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  // Calculate the total price based on quantity
  const totalPrice = !isNaN(discountedPrice) && discountedPrice !== null 
    ? parseFloat(finalDiscountedPrice) // Ensure it's a number
    : parseFloat(finalProductPrice); // Ensure it's a number

  // Calculate the total price for the quantity
  console.log(totalPrice);
  
  const calculatedTotalPrice = totalPrice * quantityCount;

  // Debugging: log the values used for calculations
  useEffect(() => {
    console.log("Discounted Price:", discountedPrice);
    console.log("Final Discounted Price:", finalDiscountedPrice);
    console.log("Final Product Price:", finalProductPrice);
    console.log("Quantity Count:", quantityCount);
    console.log("Calculated Total Price:", calculatedTotalPrice);
  }, [discountedPrice, finalDiscountedPrice, finalProductPrice, quantityCount]);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        <span>{currency.currencySymbol + calculatedTotalPrice.toFixed(2)}</span>
        {discountedPrice !== null && (
          <span className="old">
            {currency.currencySymbol + (totalPrice * quantityCount).toFixed(2)}
          </span>
        )}
      </div>

      {product.rating && product.rating > 0 && (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      )}

      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>

      {product.variations && product.variations.length > 0 && (
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
                    checked={single.color === selectedProductColor}
                    onChange={() => {
                      setSelectedProductColor(single.color);
                      setSelectedProductSize(single.sizes[0].name);
                      setProductStock(single.sizes[0].stock);
                      setQuantityCount(1); // Reset quantity when color changes
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
              {product.variations.map((single) =>
                single.color === selectedProductColor &&
                single.sizes.map((singleSize, key) => (
                  <label
                    className={`pro-details-size-content--single`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={singleSize.name}
                      checked={singleSize.name === selectedProductSize}
                      onChange={() => {
                        setSelectedProductSize(singleSize.name);
                        setProductStock(singleSize.stock);
                        setQuantityCount(1); // Reset quantity when size changes
                      }}
                    />
                    <span className="size-name">{singleSize.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
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
              onClick={() => setQuantityCount(prev => Math.max(1, prev - 1))}
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
                setQuantityCount(prev =>
                  Math.min(prev + 1, productStock - productCartQty)
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
              <button onClick={() => navigate('/checkout')}>Buy Now</button>
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
      {product.category && (
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
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  product: PropTypes.object.isRequired,
  discountedPrice: PropTypes.number,
  currency: PropTypes.object,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  cartItems: PropTypes.array.isRequired,
  wishlistItem: PropTypes.object,
  compareItem: PropTypes.object,
};

export default ProductDescriptionInfo;
