import React from 'react'
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import CartItem from './CartItem';

const Cart = () => {
  const lineItems = useAppSelector((state: RootState) => state.cart[0].line_items);
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {lineItems.map(element => <CartItem data={element}></CartItem>)}
    </div>
  )
}

export default Cart