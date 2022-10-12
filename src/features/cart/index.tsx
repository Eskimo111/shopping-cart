import React from "react";
import CartItemList from "./components/CartItemList";
import CheckOut from "./components/CheckOut";

const Cart = () => {
  return (
    <div className="px-2 md:px-12 lg:px-28 flex flex-col md:flex-col flex-wrap gap-6">
      <CartItemList />
      <CheckOut />
    </div>
  );
};

export default Cart;
