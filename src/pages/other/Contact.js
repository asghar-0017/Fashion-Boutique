import { Fragment, useState } from "react"; 
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios"; // Import axios

const Contact = () => {
  let { pathname } = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State to store response message
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation (optional)
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setResponseMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('https://e-commerce-lime-omega.vercel.app/create-contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setResponseMessage('Thank you for contacting us!');
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
      } else {
        setResponseMessage('Failed to send your message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of Needs and Luxuries eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Contact", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            {/* Commenting out Google Map */}
            {/* <div className="contact-map mb-10">
              <GoogleMap lat={47.444} lng={-122.176} />
            </div> */}
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:yourname@email.com">
                          yourname@email.com
                        </a>
                      </p>
                      <p>
                        <a href="https://yourwebsitename.com">
                          yourwebsitename.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Address goes here, </p>
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                 </div>
                </div>
               <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Name*" type="text"  value={formData.name}
                          onChange={handleChange}
                          required />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" value={formData.email}
                          onChange={handleChange}
                          required />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          defaultValue={""}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                        <button className="submit" type="submit">
                          SEND
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message">{responseMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
