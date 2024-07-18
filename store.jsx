import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import schoolsReducer from "./slices/school";
import cartReducer from "./slices/cart";

const store = configureStore({
  reducer: {
    auth: authReducer,
    schools: schoolsReducer,
    cart: cartReducer,
  },
});

export default store;
