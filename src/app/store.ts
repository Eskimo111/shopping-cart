import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/shopping/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import filterReducer from "../features/filter-product/filterSlice";

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
