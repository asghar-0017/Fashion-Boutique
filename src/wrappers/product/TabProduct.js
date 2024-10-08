import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import axios from "axios";
import API_CONFIG from "../../config/Api/api";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
}) => {
  const { apiKey } = API_CONFIG;
  const [filterCollection, setFilterCollection] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get(`${apiKey}/get-product-collection`);
        setFilterCollection(response.data.collections); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div
      className={clsx(
        "product-area",
        spaceTopClass,
        spaceBottomClass,
        bgColorClass
      )}
    >
      <div className="container">
        <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
        <FormControl sx={{ m: 2, minWidth: 180 }}>
          <InputLabel>Collections</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Collections"
          >
            <MenuItem value="All">All</MenuItem>
            {filterCollection.map((collection, index) => (
              <MenuItem key={index} value={collection}>
                {collection}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tab.Container defaultActiveKey="bestSeller">
          <Tab.Content>
            <div className="row" style={{ marginTop: "50px" }}>
              <ProductGrid
                category={selectedCategory}
                type="saleItems"
                limit={8}
                spaceBottomClass="mb-25"
              />
            </div>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProduct;
