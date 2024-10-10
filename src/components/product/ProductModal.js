import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import Rating from "./sub-components/ProductRating";
import "./productModal.css"; // External CSS file for styling

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

  const [quantity, setQuantity] = useState(1);

  const productPrice = finalProductPrice ? parseFloat(finalProductPrice) : 0;
  const discountPrice = finalDiscountedPrice
    ? parseFloat(finalDiscountedPrice)
    : 0;

  const totalPrice =
    discountPrice > 0 ? discountPrice * quantity : productPrice * quantity;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        price: productPrice,
        discountprice: discountPrice,
        quantity: quantity,
      })
    );
    onHide();
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        ...product,
        price: productPrice,
        discountprice: discountPrice,
      })
    );
    onHide();
  };

  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (!isNaN(newQty) && newQty > 0) {
      setQuantity(newQty);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">
          {product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-modal-body">
          <div className="product-image-container">
            <img
              className="product-image"
              src={product.Imageurl}
              alt={product.title}
            />
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

                  {productPrice != discountPrice && (
                    <span className="old-price">
                      {currency.currencySymbol + productPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="normal-price">
                  {currency.currencySymbol + productPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="product-description">{product.description}</p>

            <Form.Group controlId="quantityInput">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
            </Form.Group>

            <div className="product-total">
              <p>Qty: {quantity}</p>
              <p>Total: {currency.currencySymbol + totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
      <Button
  className={`btn-add-to-cart ${product.stockStatus === "Out of Stock" ? "out-of-stock" : ""}`}
  onClick={handleAddToCart}
  disabled={product.stockStatus === "Out of Stock"} // Disable the button if out of stock
>
  {product.stockStatus === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
</Button>
        <Button className="btn-add-to-wishlist" onClick={handleAddToWishlist}>
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
