import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import cogoToast from "cogo-toast";

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

  // Initialize state with product variations
  const initialColor = product?.variations?.[0]?.color || "";
  const initialSize = product?.variations?.[0]?.sizes?.[0]?.name || "";
  const initialStock =
    product?.variations?.[0]?.sizes?.[0]?.stock || product?.stock || 0;

  const [selectedProductColor, setSelectedProductColor] = useState(initialColor);
  const [selectedProductSize, setSelectedProductSize] = useState(initialSize);
  const [productStock, setProductStock] = useState(initialStock);
  const [quantityCount, setQuantityCount] = useState(1);

  // Calculate product cart quantity and total price
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const totalPrice =
    !isNaN(discountedPrice) && discountedPrice !== null
      ? parseFloat(finalDiscountedPrice)
      : parseFloat(finalProductPrice);

  const calculatedTotalPrice = totalPrice * quantityCount;

  // Handler for adding item to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        Quantity: quantityCount,
        selectedProductColor,
        selectedProductSize,
      })
    );
  };

  // Handler for adding item to wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    cogoToast.success("Added to Wishlist!");
  };

  // Handler for adding item to compare
  const handleAddToCompare = () => {
    dispatch(addToCompare(product));
    cogoToast.success("Added to Compare!");
  };

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        <span>
          {currency.currencySymbol + calculatedTotalPrice.toFixed(2)}
        </span>
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
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variations.map((variation, key) => (
                <label
                  className={`pro-details-color-content--single ${variation.color}`}
                  key={key}
                >
                  <input
                    type="radio"
                    value={variation.color}
                    name="product-color"
                    checked={variation.color === selectedProductColor}
                    onChange={() => {
                      setSelectedProductColor(variation.color);
                      setSelectedProductSize(variation.sizes[0].name);
                      setProductStock(variation.sizes[0].stock);
                      setQuantityCount(1);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>

          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variations.map(
                (variation) =>
                  variation.color === selectedProductColor &&
                  variation.sizes.map((size, key) => (
                    <label
                      className="pro-details-size-content--single"
                      key={key}
                    >
                      <input
                        type="radio"
                        value={size.name}
                        checked={size.name === selectedProductSize}
                        onChange={() => {
                          setSelectedProductSize(size.name);
                          setProductStock(size.stock);
                          setQuantityCount(1);
                        }}
                      />
                      <span className="size-name">{size.name}</span>
                    </label>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() => setQuantityCount((prev) => Math.max(1, prev - 1))}
            className="dec qtybutton"
            disabled={quantityCount <= 1}
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
            onClick={() => setQuantityCount((prev) => prev + 1)}
            className="inc qtybutton"
          >
            +
          </button>
        </div>

        <div className="pro-details-cart btn-hover">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>

        {/* Wishlist and Compare Icons */}
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={handleAddToWishlist}
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
              onClick={handleAddToCompare}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  product: PropTypes.object.isRequired,
  discountedPrice: PropTypes.number,
  currency: PropTypes.object.isRequired,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number.isRequired,
  cartItems: PropTypes.array.isRequired,
  wishlistItem: PropTypes.object,
  compareItem: PropTypes.object,
};

export default ProductDescriptionInfo;
