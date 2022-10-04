import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { getCookie } from "./app/cookie";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Cart from "./features/cart";
import { createCartAsync, loadCartAsync } from "./features/cart/cartSlice";
import ProductPage from "./features/shopping/pages/product_page";
import SearchPage from "./features/shopping/pages/search_page";
import Shopping from "./features/shopping";
import LoginPage from "./features/user/loginpage/LoginPage";
import OwnerPage from "./features/owner";
import ManageProduct from "./features/owner/owner_products";
import ManageProductPage from "./features/owner/owner_products";
import OwnerProductPage from "./features/owner/owner_products/pages/edit-product";
import {
  fetchAllProduct,
  fetchProductByPage,
} from "./features/shopping/productsSlice";
import Construct from "./common/construct/Construct";
import { RootState } from "./app/store";

function App() {
  const dispatch = useAppDispatch();
  console.log("App rendered");
  console.log(window.location.pathname);
  const pagination = useAppSelector((state: RootState) => state.pagination);
  useEffect(() => {
    dispatch(fetchProductByPage({ page: 1, limit: pagination.per_page }))
      .unwrap()
      .then(() => {
        console.log(`Fetch page products success!`);
      });
    window.scrollTo(0, 0);
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
        <Route path="/owner">
          <Route index element={<OwnerPage />}></Route>
          <Route path="products">
            <Route index element={<ManageProductPage />}></Route>
            <Route path=":productId" element={<OwnerProductPage />}></Route>
          </Route>
          <Route path="*" element={<Construct />}></Route>
        </Route>
        <Route path="*" element={<Shopping />}></Route>
      </Routes>
    </div>
  );
}

export default App;
