import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { getCookie } from "./app/cookie";
import { useAppDispatch } from "./app/hooks";
import Cart from "./features/cart/Cart";
import { createCartAsync, loadCartAsync } from "./features/cart/cartSlice";
import NavBar from "./common/navbar/NavBar";
import ProductList from "./features/shopping/ProductList";
import {
  fetchAllProduct,
  fetchProductSize,
} from "./features/shopping/shoppingSlice";
import ProductPage from "./features/shopping/product_page/ProductPage";
import SearchPage from "./features/shopping/search_page/SearchPage";
import Shopping from "./features/shopping/Shopping";
import LoginPage from "./features/user/loginpage/LoginPage";

function App() {
  const dispatch = useAppDispatch();
  console.log("App rendered");
  console.log(window.location.pathname);
  useEffect(() => {
    dispatch(fetchAllProduct())
      .unwrap()
      .then(() => {
        console.log("Fetch all products success!");
      }); /*
        dispatch(fetchProductSize(""))
          .unwrap()
          .then(() => console.log("Fetch size success!"));
      })
      .catch(() => console.log("Fetch all products fails!"));*/
    if (getCookie("cart_id")) {
      console.log("loadAsync");
      dispatch(loadCartAsync());
    } else {
      dispatch(createCartAsync());
    }
  }, []);
  return (
    <div className="max-h-screen pt-12">
      <Routes>
        <Route path="/shopping" element={<Shopping />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product" element={<ProductPage />}>
          <Route index element={<div>Not found</div>}></Route>
          <Route path=":productId" element={<ProductPage />}></Route>
        </Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/user/:token" element={<LoginPage />}></Route>
        <Route path="*" element={<Shopping />}></Route>
      </Routes>
    </div>
  );
}

export default App;
