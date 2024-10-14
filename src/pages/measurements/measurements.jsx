// src/components/Measurements.js
import React, { useContext, useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { MeasurementsContext } from '../../context/cardContext';
import LayoutOne from '../../layouts/LayoutOne';
import SEO from '../../components/seo';
import { useNavigate } from 'react-router-dom';

const Measurements = () => {
  let navigate = useNavigate()
  const {
    formData,
    handleChange,
    handleKameezChange,
    handleShalwarChange,
    handleFitPreferencesChange,
    handleImageUpload
  } = useContext(MeasurementsContext);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout')
  };

  // const handleImageUploadChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //       handleImageUpload(file);
  //   }
  // };

  // const handleCheckboxChange = (event) => {
  //   setShowUploadButton(event.target.checked);
  //   if (!event.target.checked) {
  //     handleImageUpload(null); // Reset image in context when unchecked
  //   }
  // };

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
        <Container
          maxWidth="md"
          style={{
            marginTop: '40px',
            marginBottom: '40px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Customer Info */}
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
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

              {/* Kameez Measurements */}
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Kameez Measurements
                </Typography>
              </Grid>
              {[
                'bustCircumference',
                'waistCircumference',
                'hipCircumference',
                'shoulderWidth',
                'kameezLength',
                'sleeveLength',
                'armholeCircumference',
                'bicepCircumference',
                'neckCircumference',
                'frontNeckDepth',
                'shoulderToWaistLength',
                'sleeveOpeningCircumference',
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/([A-Z])/g, ' $1').trim()}
                    type="number"
                    placeholder={`Enter ${field
                      .replace(/([A-Z])/g, ' $1')
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
                <Typography variant="h4" gutterBottom>
                  Shalwar Measurements
                </Typography>
              </Grid>
              {[
                'waistCircumference',
                'hipCircumference',
                'thighCircumference',
                'inseamLength',
                'outseamLength',
                'ankleOpening',
                'rise',
                'crotchDepth',
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/([A-Z])/g, ' $1').trim()}
                    type="number"
                    placeholder={`Enter ${field
                      .replace(/([A-Z])/g, ' $1')
                      .trim()
                      .toLowerCase()}`}
                    name={field}
                    value={formData.shalwar[field]}
                    onChange={handleShalwarChange}
                  />
                </Grid>
              ))}

              {/* Fit Preferences */}
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
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

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showUploadButton}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Upload an image"
                />
                {showUploadButton && (
                  <Box mt={2}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadChange} // Use new handler
                      style={{ display: 'none' }}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                    {formData.image && ( // Use image from formData
                      <Box mt={2}>
                        <img
                          src={formData.image}
                          alt="Uploaded"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              </Grid> */}

              {/* Other fields omitted for brevity */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    marginTop: '20px',
                  }}
                >
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
