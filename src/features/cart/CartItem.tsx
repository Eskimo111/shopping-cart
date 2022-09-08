import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { CartItemType } from '../cart/cartSlice';



const CartItem = (props: { data: CartItemType }) => {
    const product = props.data;
    console.log(product);
    return (
        <div className="card-item font-inter">
            <img className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-28 md:rounded-none md:rounded-l-lg overflow-hidden' src={product.image.url} alt={product.name} />
            <div className='flex flex-col justify-between p-4 leading-normal'>
                <h2 className='font-bold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap'>{product.name}</h2>

                <div>
                    <span className='text-xl font-medium'>{product.price.formatted}đ</span>
                </div>
                <p>Quantity:{product.quantity}</p>
            </div>

        </div>
    )
}

export default CartItem