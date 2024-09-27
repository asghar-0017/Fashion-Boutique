const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "₨", // PKR symbol
        currencyName: "PKR",
        currencyRate: 1 // Assuming PKR is the base currency
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

            if (currencyName === "USD") {
                return {
                    currencySymbol: "$",
                    currencyRate: 1, // Set appropriate conversion rate
                    currencyName
                };
            }
            if (currencyName === "EUR") {
                return {
                    currencySymbol: "€",
                    currencyRate: 1, // Set appropriate conversion rate
                    currencyName
                };
            }
            if (currencyName === "GBP") {
                return {
                    currencySymbol: "£",
                    currencyRate: 1, // Set appropriate conversion rate
                    currencyName
                };
            }
            // Add PKR handling
            if (currencyName === "PKR") {
                return {
                    currencySymbol: "₨",
                    currencyRate: 1,
                    currencyName
                };
            }
            return state; // Default return if no currency matches
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
