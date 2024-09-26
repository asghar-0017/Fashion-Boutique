import React, { Fragment, useState, useEffect } from "react"; 
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  
  const [product, setProduct] = useState(null); // Local state to store the product data

  // Fetch the specific product details from the API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-cart/${id}`);
        setProduct(response.data.data); // Set the product data to state
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    fetchProduct();
  }, [id]); // Fetch product when the 'id' changes

  // If product data is not yet loaded, return a loading indicator
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.Description}
          product={product}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          product={product} // Use the first category from the product
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
