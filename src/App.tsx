import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { getCookie } from './app/cookie';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import Cart from './features/cart/Cart';
import { createCart, loadCartById } from './features/cart/cartSlice';
import ProductList from './features/shopping/ProductList';
import { fetchAllProduct } from './features/shopping/shoppingSlice';

function App() {
  
  const dispatch = useAppDispatch();
 
  useEffect(()=>{
    dispatch(fetchAllProduct());
    console.log(getCookie("cart_id"));
    if(getCookie("cart_id")){
      dispatch(loadCartById(getCookie("cart_id")!));
    }else{
      dispatch(createCart());
    }
  }, [])
  return (
    <div className="max-h-screen p-8">
      <Routes>
        <Route path="/shopping" element={<ProductList/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="*" element={<ProductList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
