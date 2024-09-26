import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]); // Local state for cart items fetched from the API
  const [currency, setCurrency] = useState({ currencySymbol: "$", currencyRate: 1 });
  let cartTotalPrice = 0;

  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-cart");
        console.log("Cart data from API:", response.data.data);
        setCartItems(response.data.data); // Assuming response.data.data holds cart items
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item, index) => {
              // Calculate final price considering discount
              const discountedPrice = item.discountprice || item.price;
              const finalProductPrice = (item.price * currency.currencyRate).toFixed(2);
              const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

              // Update total price for all items in cart
              cartTotalPrice += item.sale
                ? finalDiscountedPrice * item.Quantity
                : finalProductPrice * item.Quantity;

              return (
                <li className="single-shopping-cart" key={index}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item._id}>
                      <img
                        alt={item.title}
                        src={item.Imageurl}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + item._id}>
                        {item.title}
                      </Link>
                    </h4>
                    <h6>Qty: {item.Quantity}</h6>
                    <span>
                      {item.sale
                        ? `${currency.currencySymbol}${finalDiscountedPrice}`
                        : `${currency.currencySymbol}${finalProductPrice}`}
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
              Total :{" "}
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
