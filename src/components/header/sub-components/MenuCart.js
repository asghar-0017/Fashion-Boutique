import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currency = useSelector((state) => state.currency);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      
      cartItems.forEach((item) => {
        const price = item.discountprice ? item.discountprice : item.price; 
        const finalProductPrice = price * currency.currencyRate; // Calculate price in current currency
        const quantity = item.quantity || 1; // Ensure Quantity is defined
        totalPrice += finalProductPrice * quantity; // Calculate the total price
      });
      setCartTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartItems, currency]);

  return (
    <div className="shopping-cart-content">
      {cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item, index) => {
              const discountedPrice = item.discountprice || item.price;
              const finalProductPrice = discountedPrice * currency.currencyRate;

              const quantity = item.quantity || 1;

              return (
                <li className="single-shopping-cart" key={index}>
                  <div className="shopping-cart-img">
                    <Link to={`${process.env.PUBLIC_URL}/product/${item._id}`}>
                      <img alt={item.title} src={item.Imageurl} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={`${process.env.PUBLIC_URL}/product/${item._id}`}>
                        {item.title}
                      </Link>
                    </h4>
                    <h6>Qty: {quantity}</h6>
                    <span>
                      {item.discountprice ? (
                        <>
                          <span>
                            {currency.currencySymbol + finalProductPrice.toFixed(2)}
                          </span>{" "}
                          <span style={{ textDecoration: 'line-through' }}>
                            {currency.currencySymbol + (item.price * currency.currencyRate).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        `${currency.currencySymbol}${(item.price * currency.currencyRate).toFixed(2)}`
                      )}
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
            <Link className="default-btn" to={`${process.env.PUBLIC_URL}/cart`}>
              View Cart
            </Link>
            <Link className="default-btn" to={`${process.env.PUBLIC_URL}/checkout`}>
              Checkout
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
