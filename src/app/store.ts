import { configureStore} from "@reduxjs/toolkit";
import shoppingReducer from "../features/shopping/shoppingSlice"

export const store = configureStore(
  {
    reducer: { shopping: shoppingReducer },
  },
);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {timer: timerState, user: userState, tasks: tasksState}
export type AppDispatch = typeof store.dispatch;
