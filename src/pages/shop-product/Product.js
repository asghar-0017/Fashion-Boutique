import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import API_CONFIG from "../../config/Api/api";


const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    const { apiKey } = API_CONFIG;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiKey}/get-product/${id}`);
        
        if (response.status === 200 && response.data.data) {
          console.log(response.data.data);
          
          setProduct(response.data.data); 
        } else {
          setError("Product data not found or invalid response");
        }
      } catch (error) {
        setError("Error fetching product data");
      } finally {
        setLoading(false); 
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          product={product} 
        />

        {/* Uncomment below if you need a related product slider */}
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
