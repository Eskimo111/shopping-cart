import React from "react";
import { RootState } from "../../../../store/store";
import { createCartAsync, deleteCartAsync } from "../../../../slices/cart";

import CartItem from "./CartItem";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../../hooks/use-app-selector";

const CartItemList = () => {
  const dispatch = useAppDispatch();
  const { id, line_items: lineItems } = useAppSelector(
    (state: RootState) => state.cart
  );

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
