import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  incrementQuantity,
  deleteFromCart,
} from "../../store/slices/cart-slice";

const Cart = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log(cartItems);
  

  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, cartItem) => {
      const finalProductPrice = cartItem.price * currency.currencyRate;
      const finalDiscountedPrice = cartItem.discountprice
        ? cartItem.discountprice * currency.currencyRate
        : finalProductPrice;

      const itemQuantity = cartItem.quantity || 1;
      console.log(cartItem.quantity);
      
      return acc + finalDiscountedPrice * itemQuantity;
    }, 0);

    setCartTotalPrice(total);
  }, [cartItems, currency]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem) => {
                            const finalProductPrice = cartItem.price * currency.currencyRate;
                            const finalDiscountedPrice = cartItem.discountprice
                              ? cartItem.discountprice * currency.currencyRate
                              : finalProductPrice;

                            const itemQuantity = cartItem.quantity || 1;

                            console.log(cartItem.quantity);
                            

                            return (
                              <tr key={cartItem._id}>
                                <td className="product-thumbnail">
                                  <Link to={`${process.env.PUBLIC_URL}/product/${cartItem._id}`}>
                                    <img
                                      className="img-fluid"
                                      src={cartItem.Imageurl || 'path/to/placeholder-image.jpg'}
                                      alt={cartItem.title}
                                    />
                                  </Link>
                                </td>
                                <td className="product-name">
                                  <Link to={`${process.env.PUBLIC_URL}/product/${cartItem._id}`}>
                                    {cartItem.title}
                                  </Link>
                                </td>
                                <td className="product-price-cart">
                                  {cartItem.discountprice ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol + finalProductPrice.toFixed(2)}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol + finalDiscountedPrice.toFixed(2)}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol + finalProductPrice.toFixed(2)}
                                    </span>
                                  )}
                                </td>
                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() => dispatch(decreaseQuantity(cartItem._id))}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={itemQuantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => dispatch(incrementQuantity(cartItem._id))}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {currency.currencySymbol + (finalDiscountedPrice * itemQuantity).toFixed(2)}
                                </td>
                                <td className="product-remove">
                                  <button onClick={() => dispatch(deleteFromCart(cartItem._id))}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="cart-total">
                  <h4>Total: {currency.currencySymbol + cartTotalPrice.toFixed(2)}</h4>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />
                      <Link to={`${process.env.PUBLIC_URL}/shop-grid-standard`}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
