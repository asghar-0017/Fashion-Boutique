import axios from "axios";
import API_CONFIG from "./config/Api/api";


const fetchProducts = async () => {
      const { apiKey } = API_CONFIG;
      try {
        const response = await axios.get(`${apiKey}/get-product`);
        console.log(response);
        // dispatch(setProducts(response.data.data));
        // store.dispatch(setProducts(response.data.data))
        // setProduct(response.data.data); 
        return response;
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    export default fetchProducts;

    // export async function fetchProducts() {
    //     const res = await fetch(`http://192.168.18.118:3001/get-product`)
    //     const result = await res.json()
    //     return result
    // }
