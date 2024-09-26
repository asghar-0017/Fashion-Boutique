import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, deleteFromCart } from "../../store/slices/cart-slice";
import axios from "axios"; // Import axios

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Local state for cart items
  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  let cartTotalPrice = 0;

  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-cart"); // Call to the API
        setCartItems(response.data.data); // Set cart items in local state
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
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
                          {cartItems.map((cartItem, key) => {
                            // Calculate final price and discounted price
                            const discountedPrice = cartItem.discountprice;
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = discountedPrice
                              ? (discountedPrice * currency.currencyRate).toFixed(2)
                              : null;

                            // Calculate total price
                            cartTotalPrice += finalDiscountedPrice
                              ? finalDiscountedPrice * cartItem.Quantity
                              : finalProductPrice * cartItem.Quantity;

                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={process.env.PUBLIC_URL + "/product/" + cartItem._id}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={cartItem.Imageurl}
                                      alt={cartItem.title}
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={process.env.PUBLIC_URL + "/product/" + cartItem._id}
                                  >
                                    {cartItem.title}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {finalDiscountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol + finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol + finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol + finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        dispatch(decreaseQuantity(cartItem))
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.Quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        dispatch(
                                          addToCart({
                                            ...cartItem,
                                            quantity: quantityCount
                                          })
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {finalDiscountedPrice !== null
                                    ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice * cartItem.Quantity
                                      ).toFixed(2)
                                    : currency.currencySymbol +
                                      (finalProductPrice * cartItem.Quantity).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(deleteFromCart(cartItem._id))
                                    }
                                  >
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
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
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
