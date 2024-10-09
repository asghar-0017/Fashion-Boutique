import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { setProducts } from "./store/slices/product-slice";
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import API_CONFIG from "./config/Api/api";
import axios from "axios";
import { CreditCardProvider } from "./context/cardContext";

// Define the fetchProducts function
const fetchProducts = async () => {
  const { apiKey } = API_CONFIG;
  try {
    const response = await axios.get(`${apiKey}/get-product`);
    console.log(response.data.data);
    return response.data.data; // Return only the data array
  } catch (error) {
    console.error("There was an error fetching the products!", error);
    return []; // Return an empty array in case of error
  }
};

// Immediately Invoked Function Expression (IIFE) to fetch products and dispatch
(async () => {
  const products = await fetchProducts(); // Await the result of fetchProducts
  store.dispatch(setProducts(products)); // Dispatch the actual data
})();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistProvider>
      <React.StrictMode>
      <CreditCardProvider>
        <App />
        </CreditCardProvider>
      </React.StrictMode>
    </PersistProvider>
  </Provider>
);
