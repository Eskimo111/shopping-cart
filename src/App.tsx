import React, { useEffect } from "react";
import { getCookie } from "./store/cookie";
import {
  createCartAsync,
  loadCartAsync,
  saveCartToCookies,
} from "./slices/cart";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import AppRouter from "./routers/AppRouter";
import useMessage from "./hooks/use-message";
import { isHideHeader } from "./routers/layout-config";
import NavBar from "./components/navbar/NavBar";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const message = useMessage();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    let token = localStorage.getItem("TOKEN");
    if (token) {
      token = JSON.parse(token).value;
    }
    console.log("🚀 ~ file: App.tsx ~ line 30 ~ useEffect ~ auth.currentUser");
    //if (token) auth.signinWithToken(token);
    {
      const cart_id = getCookie("cart_id");
      if (cart_id) {
        dispatch(loadCartAsync(cart_id));
      } else {
        dispatch(createCartAsync()).then((resolve: any) => {
          saveCartToCookies(resolve.payload.id);
        });
      }
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
