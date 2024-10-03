import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage (localStorage)
import productReducer from './slices/product-slice';
import currencyReducer from "./slices/currency-slice";
import cartReducer from "./slices/cart-slice";
import compareReducer from "./slices/compare-slice";
import wishlistReducer from "./slices/wishlist-slice";

// Redux Persist Configuration
const persistConfig = {
    key: "Needs and Luxuries",  // Key for storing data in localStorage
    version: 1.1,  // Versioning your persisted store
    storage,       // The storage engine (localStorage here)
    blacklist: ["product"],  // Don't persist the product slice
};

// Combine all reducers
const rootReducer = combineReducers({
    product: productReducer,
    currency: currencyReducer,
    cart: cartReducer,
    compare: compareReducer,
    wishlist: wishlistReducer
});

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and configure the store
export const store = configureStore({
    reducer: persistedReducer, // Apply the persisted reducer to the store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions in serializable checks
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// Create the persisted store
export const persistor = persistStore(store);
