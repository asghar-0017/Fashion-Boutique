import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import API_CONFIG from '../../config/Api/api'

const ProductDescriptionTab = ({ spaceBottomClass, product }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5, 
  });
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const { apiKey } = API_CONFIG;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${apiKey}/get-reviews/${product._id}`
        );
        console.log("Fetched Reviews:", response);
        setReviews(response.data.data || []); 
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchReviews();
  }, [product._id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      name: newReview.name,
      email: newReview.email,
      rating: newReview.rating,
      reviewMessage: newReview.message, 
      productId: product._id, 
    };

    try {
      const { apiKey } = API_CONFIG;

      const response = await axios.post(
        `${apiKey}/create-review/${product._id}`,
        reviewData
      );
      setReviews((prevReviews) => [...prevReviews, response.data.data]);
      setNewReview({ name: "", email: "", message: "", rating: 1 }); 
      console.log("Submitted Review:", response);
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review. Please try again."); 
    }
  };

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews ({reviews.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span> 10 x 10 x 15 cm
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                <p>{product.description}</p>
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {isLoading ? (
                        <p>Loading reviews...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : reviews.length > 0 ? (
                        reviews.map((review, index) => {
                          if (!review || !review.name) {
                            return null; 
                          }
                          return (
                            <div key={index} className="single-review">
                              <div className="review-content">
                                <div className="review-top-wrap">
                                  <div className="review-left">
                                    <div className="review-name">
                                      <h4>{review.name}</h4>
                                    </div>
                                    <div className="review-rating">
                                      {[...Array(Math.round(review.rating || 0))].map((_, i) => (
                                        <i key={i} className="fa fa-star" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="review-bottom">
                                  <p>{review.reviewMessage || "No message provided"}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form onSubmit={handleSubmitReview}>
                        <div className="star-box">
                        <span>Your rating:</span>
                        <div className="ratting-star">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fa fa-star ${i < newReview.rating ? "selected" : ""}`}
                              style={{
                                cursor: "pointer",
                                color: i < newReview.rating ? "#FFD700" : "#ccc", 
                              }}
                              onClick={() =>
                                setNewReview({
                                  ...newReview,
                                  rating: i + 1,
                                })
                              }
                            />
                          ))}
                        </div>
                      </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input
                                  placeholder="Name"
                                  type="text"
                                  value={newReview.name}
                                  onChange={(e) =>
                                    setNewReview({
                                      ...newReview,
                                      name: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input
                                  placeholder="Email"
                                  type="email"
                                  value={newReview.email}
                                  onChange={(e) =>
                                    setNewReview({
                                      ...newReview,
                                      email: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  placeholder="Message"
                                  value={newReview.message}
                                  onChange={(e) =>
                                    setNewReview({
                                      ...newReview,
                                      message: e.target.value,
                                    })
                                  }
                                  required
                                />
                                <input type="submit" value="Submit" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  product: PropTypes.object.isRequired,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
