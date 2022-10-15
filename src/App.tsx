import React, { useEffect } from "react";
import { getCookie } from "./store/cookie";
import { createCartAsync, loadCartAsync } from "./slices/cart";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import AppRouter from "./routers/AppRouter";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (getCookie("cart_id")) {
      dispatch(loadCartAsync());
    } else {
      dispatch(createCartAsync());
    }
  }, []);
  return (
    <div className="max-h-screen pt-12">
      <AppRouter />
    </div>
  );
}

export default App;
