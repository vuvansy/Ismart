import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/accountSlice";
export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        account: userSlice,
    },
});
