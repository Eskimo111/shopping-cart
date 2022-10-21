import React, { useEffect } from "react";
import { getCookie } from "./store/cookie";
import { createCartAsync, loadCartAsync } from "./slices/cart";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import AppRouter from "./routers/AppRouter";
import useMessage from "./hooks/use-message";
import { RootState } from "./store/store";
import { useAppSelector } from "./hooks/use-app-selector";

function App() {
  const dispatch = useAppDispatch();
  const message = useMessage();
  const { token } = useAppSelector((state: RootState) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (getCookie("cart_id")) {
      dispatch(loadCartAsync());
    } else {
      dispatch(createCartAsync());
    }
  }, []);
  //useEffect(() => {
  //message.showMessage("Login success", "success");
  //}, [token]);
  return (
    <div className="max-h-screen pt-12">
      {message.node}
      <AppRouter />
    </div>
  );
}

export default App;
