import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import Rating from "./sub-components/ProductRating";

const ProductModal = ({
  show,
  onHide,
  product,
  currency,
  discountedPrice,
  finalProductPrice,
  finalDiscountedPrice,
  wishlistItem,
}) => {
  const dispatch = useDispatch();

  // State to keep track of the quantity
  const [quantity, setQuantity] = useState(1);

  // Convert prices to valid numbers and use 0 as fallback values
  const productPrice = finalProductPrice ? parseFloat(finalProductPrice) : 0;
  const discountPrice = finalDiscountedPrice ? parseFloat(finalDiscountedPrice) : 0;

  // Calculate the total based on the quantity
  const totalPrice = discountPrice > 0 ? discountPrice * quantity : productPrice * quantity;

  console.log("Product Price:", productPrice);
  console.log("Discounted Price:", discountPrice);
  console.log("Total Price:", totalPrice);

  // Handle add to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        price: productPrice,
        discountprice: discountPrice,
        quantity: quantity, // Include the quantity in the cart item
      })
    );
    onHide(); // Close the modal after adding to cart
  };

  // Handle change in quantity
  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (!isNaN(newQty) && newQty > 0) {
      setQuantity(newQty);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-modal">
          <div className="product-image">
            <img src={product.Imageurl} alt={product.title} />
          </div>
          <div className="product-details">
            <h4 className="product-title">{product.title}</h4>
            {product.review && product.review > 0 && (
              <div className="product-rating">
                <Rating ratingValue={product.review} />
              </div>
            )}
            <div className="product-price">
              {discountPrice > 0 ? (
                <div>
                  <span className="discounted-price">
                    {currency.currencySymbol + discountPrice.toFixed(2)}
                  </span>
                  <span className="old-price">
                    {currency.currencySymbol + productPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span>{currency.currencySymbol + productPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="product-description">{product.description}</p>

            {/* Quantity Input */}
            <Form.Group controlId="quantityInput">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>

            {/* Display Quantity and Total Price */}
            <div className="product-total">
              <p>Qty: {quantity}</p>
              <p>Total: {currency.currencySymbol + totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="secondary" onClick={() => dispatch(addToWishlist(product))}>
          Add to Wishlist
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  discountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  wishlistItem: PropTypes.object,
};

export default ProductModal;
