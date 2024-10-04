import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; 
import { clearCart } from "../../store/slices/cart-slice";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import API_CONFIG from "../../config/Api/api";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  let cartTotalPrice = 0;
  let { pathname } = useLocation();
  let navigate = useNavigate()
  const { apiKey } = API_CONFIG;
  const dispatch = useDispatch(); 
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const products = cartItems.map((item) => ({
      // productId: item._id, 
      quantity: item.quantity,
      price: item.price,
      name: item.title,
      Imageurl: item.Imageurl,
      title:item.title
    }));    

    const billingDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.streetAddress,
      apartment: data.apartment,
      postCode: data.postcode,
      phone: data.phone,
      email: data.email,
      additionalInformation: data.additionalInfo,
      products: products,
    };    
    console.log("BillingData",billingDetails)

    try {
      const response = await axios.post(`${apiKey}/create-billing-detail`, billingDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response",response)
      Swal.fire({
        title: "Success!",
        text: "Order placed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
      console.log("Order placed successfully:", response.data);
      dispatch(clearCart());

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error placing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error placing order:", error);
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Needs and Luxuries eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit(onSubmit)}> 
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>First Name</label>
                            <input type="text" {...register("firstName", { required: "First Name is required" })} />
                            {errors.firstName && <span style={{color: "red"}}>{errors.firstName.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Last Name</label>
                            <input type="text" {...register("lastName", { required: "Last Name is required" })} />
                            {errors.lastName && <span style={{color: "red"}}>{errors.lastName.message}</span>}
                          </div>
                        </div>
                        
                        {/* <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>Country</label>
                            <select {...register("country", { required: "Country is required" })}>
                              <option value="">Select a country</option>
                              <option value="Azerbaijan">Pakistan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                            </select>
                            {errors.country && <span>{errors.country.message}</span>}
                          </div>
                        </div> */}
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address</label>
                            <input
                              className="billing-address"
                              placeholder="House number and street name"
                              type="text"
                              {...register("streetAddress", { required: "Street Address is required" })}
                            />
                            {errors.streetAddress && <span style={{color: "red"}}>{errors.streetAddress.message}</span>}
                            <input
                              placeholder="Apartment, suite, unit etc."
                              type="text"
                              {...register("apartment")}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Town / City</label>
                            <input type="text" {...register("city", { required: "City is required" })} />
                            {errors.city && <span style={{color: "red"}}>{errors.city.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>State / County</label>
                            <input type="text" {...register("state", { required: "State is required" })} />
                            {errors.state && <span style={{color: "red"}}>{errors.state.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Postcode / ZIP</label>
                            <input type="text" {...register("postcode", { required: "Postcode is required" })} />
                            {errors.postcode && <span style={{color: "red"}}>{errors.postcode.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone</label>
                            <input type="text" {...register("phone", { required: "Phone is required" })} />
                            {errors.phone && <span style={{color: "red"}}>{errors.phone.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email Address</label>
                            <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Email is not valid" } } )} />
                            {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            placeholder="Notes about your order, e.g. special notes for delivery."
                            {...register("additionalInfo")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
                                const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(2);
                                const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice += finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice += finalProductPrice * cartItem.quantity);
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? currency.currencySymbol + (finalDiscountedPrice * cartItem.quantity).toFixed(2)
                                        : currency.currencySymbol + (finalProductPrice * cartItem.quantity).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button type="submit" className="btn-hover">Place Order</button> 
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />
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

export default Checkout;
