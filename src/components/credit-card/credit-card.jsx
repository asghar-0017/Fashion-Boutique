import React, { useContext, useState } from 'react';
import CreditCard from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { CreditCardContext } from '../../context/cardContext';
import { Grid, TextField, Paper } from '@mui/material';

const CreditCardForm = () => {
  const { cardDetails, updateCardDetails } = useContext(CreditCardContext);
  const [focused, setFocused] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCardDetails(name, value);
  };

  const handleFocus = (e) => {
    setFocused(e.target.name);
  };

  return (
      <Grid container spacing={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <CreditCard
            number={cardDetails.number}
            name={cardDetails.name}
            expiry={cardDetails.expiry}
            cvc={cardDetails.cvc}
            focused={focused}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <form>
            <TextField
              fullWidth
              label="Card Number"
              name="number"
              value={cardDetails.number}
              onChange={handleInputChange}
              onFocus={handleFocus}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Cardholder Name"
              name="name"
              value={cardDetails.name}
              onChange={handleInputChange}
              onFocus={handleFocus}
              variant="outlined"
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVC"
                  name="cvc"
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
  );
};

export default CreditCardForm;
