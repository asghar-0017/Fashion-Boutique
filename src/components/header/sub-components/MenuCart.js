import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from Redux store
  const currency = useSelector((state) => state.currency); // Access currency from Redux store
  const [cartTotalPrice, setCartTotalPrice] = useState(0); // Use state to track total price

  // Calculate total price whenever cartItems or currency changes
  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartItems.forEach(item => {
        const discountedPrice = item.discountprice || item.price;
        const finalProductPrice = item.sale
          ? discountedPrice * currency.currencyRate
          : item.price * currency.currencyRate;

        totalPrice += finalProductPrice * (item.Quantity || 1); // Ensure Quantity is defined
      });
      setCartTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartItems, currency]); // Recalculate when cartItems or currency changes

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item, index) => {
              const discountedPrice = item.discountprice || item.price;
              const finalProductPrice = (item.sale
                ? discountedPrice * currency.currencyRate
                : item.price * currency.currencyRate).toFixed(2);
              const quantity = item.Quantity || 1; // Default to 0 if undefined

              return (
                <li className="single-shopping-cart" key={index}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item._id}>
                      <img alt={item.title} src={item.Imageurl} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + item._id}>
                        {item.title}
                      </Link>
                    </h4>
                    <h6>Qty: {quantity}</h6> {/* Use quantity safely */}
                    <span>
                      {item.sale
                        ? `${currency.currencySymbol}${(discountedPrice * currency.currencyRate).toFixed(2)}`
                        : `${currency.currencySymbol}${(item.price * currency.currencyRate).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => dispatch(deleteFromCart(item._id))}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total:{" "}
              <span className="shop-total">
                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/checkout"}>
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
