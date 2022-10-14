import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slices/products";
import cartReducer from "../slices/cart";
import userReducer from "../slices/user";
import paginationReducer from "../slices/pagination";
import filterReducer from "../slices/filter";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    pagination: paginationReducer,
    filter: filterReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {timer: timerState, user: userState, tasks: tasksState}
export type AppDispatch = typeof store.dispatch;
