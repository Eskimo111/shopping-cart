import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "../features/shopping/shoppingSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: { shopping: shoppingReducer, cart: cartReducer, user: userReducer },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {timer: timerState, user: userState, tasks: tasksState}
export type AppDispatch = typeof store.dispatch;
