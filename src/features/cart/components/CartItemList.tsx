import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { createCartAsync, deleteCartAsync } from "../../../slices/cart";

import CartItem from "./CartItem";

const CartItemList = () => {
  const { id, line_items: lineItems } = useAppSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();
  return (
    <div className="basis-full md:basis-2/3 pt-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-8">Cart</h2>
        <button
          className="border border-black p-1 px-3 rounded-md h-fit"
          onClick={() => {
            dispatch(deleteCartAsync(id));
            dispatch(createCartAsync());
          }}
        >
          Refresh cart
        </button>
      </div>
      <div className="flex flex-col items-baseline justify-center gap-3">
        {lineItems.map((element, index) => (
          <CartItem key={index} data={element}></CartItem>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
