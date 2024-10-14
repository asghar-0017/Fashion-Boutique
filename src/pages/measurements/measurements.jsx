import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Container,
  Typography, // Import Typography for professional headings
} from "@mui/material";
import LayoutOne from "../../layouts/LayoutOne";
import SEO from "../../components/seo";

const Measurements = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    height: "",
    weight: "",
    image: "",
    kameez: {
      bustCircumference: "",
      waistCircumference: "",
      hipCircumference: "",
      shoulderWidth: "",
      kameezLength: "",
      sleeveLength: "",
      armholeCircumference: "",
      bicepCircumference: "",
      neckCircumference: "",
      frontNeckDepth: "",
      shoulderToWaistLength: "",
      sleeveOpeningCircumference: "",
    },
    shalwar: {
      waistCircumference: "",
      hipCircumference: "",
      thighCircumference: "",
      inseamLength: "",
      outseamLength: "",
      ankleOpening: "",
      rise: "",
      crotchDepth: "",
    },
    fitPreferences: {
      kameezFit: "",
      sleeveStyle: "",
      pantStyle: "",
      necklineStyle: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKameezChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      kameez: {
        ...prevData.kameez,
        [name]: value,
      },
    }));
  };

  const handleShalwarChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      shalwar: {
        ...prevData.shalwar,
        [name]: value,
      },
    }));
  };

  const handleFitPreferencesChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      fitPreferences: {
        ...prevData.fitPreferences,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <SEO
        titleTemplate="Needs and Luxuries"
        description="Needs and Luxuries a eCommerce website."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1">
        <Container
          maxWidth="md"
          style={{
            marginTop: "40px",
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#f9f9f9", // Light background for contrast
            borderRadius: "8px", // Rounded corners
          }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Customer Info */}
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  gutterBottom>
                  Customer Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Customer name"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  name="height"
                  placeholder="Enter height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Grid> */}

              {/* Kameez Measurements */}
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  gutterBottom>
                  Kameez Measurements
                </Typography>
              </Grid>
              {[
                "bustCircumference",
                "waistCircumference",
                "hipCircumference",
                "shoulderWidth",
                "kameezLength",
                "sleeveLength",
                "armholeCircumference",
                "bicepCircumference",
                "neckCircumference",
                "frontNeckDepth",
                "shoulderToWaistLength",
                "sleeveOpeningCircumference",
              ].map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={field}>
                  <TextField
                    fullWidth
                    label={field
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                    type="number"
                    placeholder={`Enter ${field
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .toLowerCase()}`}
                    name={field}
                    value={formData.kameez[field]}
                    onChange={handleKameezChange}
                  />
                </Grid>
              ))}

              {/* Shalwar Measurements */}
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  gutterBottom>
                  Shalwar Measurements
                </Typography>
              </Grid>
              {[
                "waistCircumference",
                "hipCircumference",
                "thighCircumference",
                "inseamLength",
                "outseamLength",
                "ankleOpening",
                "rise",
                "crotchDepth",
              ].map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={field}>
                  <TextField
                    fullWidth
                    label={field
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                    type="number"
                    placeholder={`Enter ${field
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .toLowerCase()}`}
                    name={field}
                    value={
                      formData.shalwar[field]
                    }
                    onChange={handleShalwarChange}
                  />
                </Grid>
              ))}

              {/* Fit Preferences */}
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  gutterBottom>
                  Fit Preferences
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Kameez fit"
                  name="kameezFit"
                  value={
                    formData.fitPreferences
                      .kameezFit
                  }
                  onChange={
                    handleFitPreferencesChange
                  }>
                  {[
                    "Fitted",
                    "Semi-fitted",
                    "Loose",
                  ].map((option) => (
                    <MenuItem
                      key={option}
                      value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Sleeve style"
                  name="sleeveStyle"
                  value={
                    formData.fitPreferences
                      .sleeveStyle
                  }
                  onChange={
                    handleFitPreferencesChange
                  }>
                  {[
                    "Full",
                    "Three-quarter",
                    "Half",
                    "Sleeveless",
                  ].map((option) => (
                    <MenuItem
                      key={option}
                      value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Pant style"
                  name="pantStyle"
                  value={
                    formData.fitPreferences
                      .pantStyle
                  }
                  onChange={
                    handleFitPreferencesChange
                  }>
                  {[
                    "Traditional",
                    "Churidar",
                    "Straight-cut",
                  ].map((option) => (
                    <MenuItem
                      key={option}
                      value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Neckline style"
                  name="necklineStyle"
                  value={
                    formData.fitPreferences
                      .necklineStyle
                  }
                  onChange={
                    handleFitPreferencesChange
                  }>
                  {[
                    "V-neck",
                    "Round neck",
                    "Boat neck",
                    "Custom",
                  ].map((option) => (
                    <MenuItem
                      key={option}
                      value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    marginTop: "20px",
                  }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </LayoutOne>
    </>
  );
};

export default Measurements;
