import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import ProductGridSingle from "../../components/product/ProductGridSingle";

const HomeFashion = () => {
  return (
    <>
      <SEO
        titleTemplate="Needs and Luxuries"
        description="Needs and Luxuries a eCommerce website."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />
        {/* <ProductGridSingle /> */}

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </LayoutOne>
    </>
  );
};

export default HomeFashion;
