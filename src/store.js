import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Make sure the path is correct

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;