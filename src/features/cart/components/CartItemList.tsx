import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

import CartItem from "./CartItem";

const CartItemList = () => {
  const lineItems = useAppSelector(
    (state: RootState) => state.cart[0].line_items
  );
  return (
    <div className="basis-full md:basis-2/3 pt-8">
      <h2 className="text-2xl font-bold mb-8">Cart</h2>
      <div className="flex flex-col items-baseline justify-center gap-3">
        {lineItems.map((element, index) => (
          <CartItem key={index} data={element}></CartItem>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
