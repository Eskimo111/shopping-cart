import React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import CartItem from "./CartItem";
import CartItemList from "./CartItemList";
import CheckOut from "./CheckOut";

const Cart = () => {
  const lineItems = useAppSelector(
    (state: RootState) => state.cart[0].line_items
  );
  return (
    <div className="px-2 md:px-12 lg:px-28 flex flex-col md:flex-col flex-wrap gap-6">
      <CartItemList />
      <CheckOut />
    </div>
  );
};

export default Cart;
