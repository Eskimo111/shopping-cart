import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ConstructPage from "../components/construct/Construct";
import NavBar from "../components/navbar/NavBar";
import RestrictedPage from "../components/restricted/Restricted";
import LoginPage from "../features/auth/pages/LoginPage";
import SignUpPage from "../features/auth/pages/SignUpPage";
import CartPage from "../features/customer/cart";
import ShoppingPage from "../features/customer/shopping";
import ProductPage from "../features/customer/shopping/pages/product_page";
import SearchPage from "../features/customer/shopping/pages/search_page";
import OwnerPage from "../features/owner";
import ManageProductPage from "../features/owner/owner_products";
import OwnerProductPage from "../features/owner/owner_products/pages/edit-product";
import useAuth from "../hooks/use-auth";

const AppRouter = () => {
  const auth = useAuth();
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<ShoppingPage />}></Route>
      <Route path="/shopping" element={<ShoppingPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/product">
        <Route index element={<div>Not found</div>}></Route>
        <Route path=":productId" element={<ProductPage />}></Route>
      </Route>
      <Route path="/search" element={<SearchPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/owner">
        {auth.hasPermisssion(location.pathname) ? (
          <>
            <Route index element={<OwnerPage />}></Route>
            <Route path="products">
              <Route index element={<ManageProductPage />}></Route>
              <Route path=":productId" element={<OwnerProductPage />}></Route>
            </Route>
            <Route path="*" element={<ConstructPage />}></Route>
          </>
        ) : (
          <Route index element={<RestrictedPage />}></Route>
        )}
      </Route>
      <Route path="*" element={<ShoppingPage />}></Route>
    </Routes>
  );
};

export default AppRouter;
