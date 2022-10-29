import React, { useEffect } from "react";
import { getCookie } from "./store/cookie";
import { createCartAsync, loadCartAsync } from "./slices/cart";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import AppRouter from "./routers/AppRouter";
import useMessage from "./hooks/use-message";
import { RootState } from "./store/store";
import { useAppSelector } from "./hooks/use-app-selector";
import { isHideHeader } from "./routers/layout-config";
import NavBar from "./components/navbar/NavBar";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const message = useMessage();
  const { token } = useAppSelector((state: RootState) => state.user);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const cart_id = getCookie("cart_id");
    if (cart_id) {
      dispatch(loadCartAsync(cart_id));
    } else {
      dispatch(createCartAsync());
    }
  }, []);
  //useEffect(() => {
  //message.showMessage("Login success", "success");
  //}, [token]);
  return (
    <>
      {isHideHeader(location.pathname) || <NavBar />}
      <div className="max-h-screen pt-12">
        {message.node}
        <AppRouter />
      </div>
    </>
  );
}

export default App;
