import React, { createContext, useState } from 'react';

export const MeasurementsContext = createContext();

export const MeasurementsProvider = ({ children }) => {  
  const [formData, setFormData] = useState({
    customerName: "",
    height: "",
    weight: "",
    stitchImage: "",
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

  const handleImageUpload = (image) => {
    console.log(image);
    
    setFormData((prevData) => ({
      ...prevData,
      stitchImage: image,
    }));
  };

  return (
    <MeasurementsContext.Provider
      value={{
        formData,
        handleChange,
        handleKameezChange,
        handleShalwarChange,
        handleFitPreferencesChange,
        setFormData,
        handleImageUpload
      }}
    >
      {children}
    </MeasurementsContext.Provider>
  );
};
