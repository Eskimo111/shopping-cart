import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { getCookie } from "./app/cookie";
import { useAppDispatch } from "./app/hooks";
import Cart from "./features/cart/Cart";
import { createCartAsync, loadCartAsync } from "./features/cart/cartSlice";
import NavBar from "./features/navbar/NavBar";
import ProductList from "./features/shopping/ProductList";
import { fetchAllProduct } from "./features/shopping/shoppingSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
    if (getCookie("cart_id")) {
      console.log("loadAsync");
      dispatch(loadCartAsync());
    } else {
      dispatch(createCartAsync());
    }
  }, []);
  return (
    <div className="max-h-screen p-8 pt-20">
      <Routes>
        <Route path="/shopping" element={<ProductList />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<ProductList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
