import React, { createContext, useState } from 'react';

// Create a context
export const CreditCardContext = createContext();

// Create a provider component
export const CreditCardProvider = ({ children }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  // Function to update card details
  const updateCardDetails = (name, value) => {
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <CreditCardContext.Provider value={{ cardDetails, updateCardDetails }}>
      {children}
    </CreditCardContext.Provider>
  );
};
