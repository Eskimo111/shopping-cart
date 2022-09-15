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

function App() {
  const dispatch = useAppDispatch();
  console.log("App rendered");
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
    <div className="max-h-screen p-8 pt-20">
      <Routes>
        <Route path="/shopping" element={<ProductList />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product" element={<ProductPage />}>
          <Route index element={<div>Not found</div>}></Route>
          <Route path=":productId" element={<ProductPage />}></Route>
        </Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="*" element={<ProductList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
