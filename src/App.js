import { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./helpers/scroll-top";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// home pages
const HomeFashion = lazy(() =>
  import("./pages/home/HomeFashion")
);

// shop pages

const ShopGridNoSidebar = lazy(() =>
  import("./pages/shop/ShopGridNoSidebar")
);

// product pages
const Product = lazy(() =>
  import("./pages/shop-product/Product")
);
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() =>
  import("./pages/shop-product/ProductSticky")
);
const ProductSlider = lazy(() =>
  import("./pages/shop-product/ProductSlider")
);
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogNoSidebar = lazy(() =>
  import("./pages/blog/BlogNoSidebar")
);

// other pages
const About = lazy(() =>
  import("./pages/other/About")
);
const Contact = lazy(() =>
  import("./pages/other/Contact")
);
const MyAccount = lazy(() =>
  import("./pages/other/MyAccount")
);
const LoginRegister = lazy(() =>
  import("./pages/other/LoginRegister")
);

const Cart = lazy(() =>
  import("./pages/other/Cart")
);
const Wishlist = lazy(() =>
  import("./pages/other/Wishlist")
);
const Compare = lazy(() =>
  import("./pages/other/Compare")
);
const Checkout = lazy(() =>
  import("./pages/other/Checkout")
);
const Measurements = lazy(() =>
  import("./pages/measurements/measurements")
);

const NotFound = lazy(() =>
  import("./pages/other/NotFound")
);


const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }>
          <Routes>
            <Route
              path={process.env.PUBLIC_URL + "/"}
              element={<HomeFashion />}
            />

            {/* Homepages */}
            <Route
              path={
                process.env.PUBLIC_URL +
                "/home-fashion"
              }
              element={<HomeFashion />}
            />

            <Route
              path={
                process.env.PUBLIC_URL +
                "/measurements"
              }
              element={<Measurements />}
            />

            {/* Shop pages */}

            <Route
              path={
                process.env.PUBLIC_URL +
                "/shop-grid-no-sidebar"
              }
              element={<ShopGridNoSidebar />}
            />

            {/* Shop product pages */}
            <Route
              path={
                process.env.PUBLIC_URL +
                "/product/:id"
              }
              element={<Product />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/product-tab-left/:id"
              }
              element={<ProductTabLeft />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/product-tab-right/:id"
              }
              element={<ProductTabRight />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/product-sticky/:id"
              }
              element={<ProductSticky />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/product-slider/:id"
              }
              element={<ProductSlider />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/product-fixed-image/:id"
              }
              element={<ProductFixedImage />}
            />

            {/* Blog pages */}

            <Route
              path={
                process.env.PUBLIC_URL +
                "/blog-no-sidebar"
              }
              element={<BlogNoSidebar />}
            />

            {/* Other pages */}
            <Route
              path={
                process.env.PUBLIC_URL + "/about"
              }
              element={<About />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/contact"
              }
              element={<Contact />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/my-account"
              }
              element={<MyAccount />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/login-register"
              }
              element={<LoginRegister />}
            />

            <Route
              path={
                process.env.PUBLIC_URL + "/cart"
              }
              element={<Cart />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/wishlist"
              }
              element={<Wishlist />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/compare"
              }
              element={<Compare />}
            />
            <Route
              path={
                process.env.PUBLIC_URL +
                "/checkout"
              }
              element={<Checkout />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
