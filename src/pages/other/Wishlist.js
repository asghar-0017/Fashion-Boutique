import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart } from "../../store/slices/cart-slice";
import { deleteFromWishlist, deleteAllFromWishlist } from "../../store/slices/wishlist-slice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation(); 

  const currency = useSelector((state) => state.currency);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  console.log(wishlistItems);
  

  return (
    <Fragment>
      <SEO
        titleTemplate="Wishlist"
        description="Whishlist page of Needs and Luxuries eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Wishlist", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Add To Cart</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem) => {
                            // const discountedPrice = getDiscountPrice(
                            //   wishlistItem.price,
                            //   wishlistItem.discountprice
                            // );
                            // const finalProductPrice = (
                            //   wishlistItem.price * currency.currencyRate
                            // ).toFixed(2);
                            // const finalDiscountedPrice = (
                            //   discountedPrice * currency.currencyRate
                            // ).toFixed(2);
                            const cartItem = cartItems.find(
                              (item) => item.id === wishlistItem.id
                            );


                            const finalProductPrice = wishlistItem.price * currency.currencyRate;
                            const finalDiscountedPrice = wishlistItem.discountprice
                              ? wishlistItem.discountprice * currency.currencyRate
                              : finalProductPrice;

                            

                            console.log("WishList Items",wishlistItem)
                            
                            return (
                              <tr key={wishlistItem.id}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                  >
                                    {wishlistItem.Imageurl ? (
                                      <img
                                        className="img-fluid"
                                        src={`${process.env.PUBLIC_URL}${wishlistItem.Imageurl}`}
                                        alt={wishlistItem.name}
                                      />
                                    ) : (
                                      <span>No image available</span>
                                    )}
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                  >
                                    {wishlistItem.title}
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

                                <td className="product-wishlist-cart">
                                  {wishlistItem.affiliateLink ? (
                                    <a
                                      href={wishlistItem.affiliateLink}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      Buy now
                                    </a>
                                  ) : wishlistItem.variation?.length > 0 ? (
                                    <Link to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}>
                                      Select option
                                    </Link>
                                  ) : (
                                    <button
                                    
                                    onClick={() =>
                                      dispatch(
                                        addToCart({
                                          ...wishlistItem,
                                          price:finalProductPrice,
                                          discountedPrice: finalDiscountedPrice 
                                        })
                                      )
                                    }                                    
                                      className={cartItem?.quantity > 0 ? "active" : ""}
                                      title={
                                        cartItem?.quantity > 0
                                          ? "Added to cart"
                                          : wishlistItem.stock <= 0
                                          ? "Out of stock"
                                          : "Add to cart"
                                      }
                                      disabled={wishlistItem.stock <= 0}
                                    >
                                        {console.log(finalDiscountedPrice, finalProductPrice)
                                    }
                                      {wishlistItem.stock <= 0
                                        ? "Out of Stock"
                                        : cartItem?.quantity > 0
                                        ? "Added"
                                        : "Add to Cart"}
                                    </button>
                                    
                                  )}
                                  
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() => dispatch(deleteFromWishlist(wishlistItem.id))}
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

                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="cart-shipping-update-wrapper"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="cart-shipping-update">
                        <Link
                          to={`${process.env.PUBLIC_URL}/`}
                          className="continue-shopping-btn"
                        >
                          Continue Shopping
                        </Link>
                      </div>

                      <div className="cart-clear">
                        <button
                          onClick={() => dispatch(deleteAllFromWishlist())}
                          className="clear-wishlist-btn"
                        >
                          Clear Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />
                      <Link to={`${process.env.PUBLIC_URL}/`}>
                        Add Items
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

export default Wishlist;
