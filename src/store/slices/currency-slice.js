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
            
            // Handling different currency types
            switch (currencyName) {
                case "PKR":
                    return {
                        currencySymbol: "₨",
                        currencyRate: 1,
                        currencyName
                    };
                case "USD":
                    return {
                        currencySymbol: "$",
                        currencyRate: 286, // Example rate, can be fetched dynamically
                        currencyName
                    };
                case "EUR":
                    return {
                        currencySymbol: "€",
                        currencyRate: 305, // Example rate, can be fetched dynamically
                        currencyName
                    };
                default:
                    return state; // Return current state if no matching currency
            }
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
