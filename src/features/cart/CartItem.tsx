import { produceWithPatches } from 'immer';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { CartItemType, removeFromCart } from '../cart/cartSlice';

const formatPrice = (price: number) => {
    return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

const CartItem = (props: { data: CartItemType }) => {
    const product = props.data;
    const [quantity, setQuantity] = useState(product.quantity);
    const dispatch = useAppDispatch();
    return (
        <div className="card-item font-inter justify-between border-b pb-12">
            <div className='h-full flex flex-col items-center md:flex-row md:max-w-xl gap-4'>
                <div className='md:w-32 md:h-32'>
                <img className="w-full h-full object-cover" src={product.image.url} alt={product.name} />
                </div>
                <div className='flex flex-col justify-between p-4 leading-normal gap-2'>
                    <h2 className='text-lg overflow-ellipsis overflow-hidden whitespace-nowrap'>{product.name}</h2>
                    <span className='text-gray-600 '>Yellow</span>
                    <div className='flex gap-6'>
                        {/* Size Drop Down */}
                        <div className='text-gray-600'>Size <select className="h-full px-2 rounded-md divide-y border-gray-400 border">
                            <option value="1">1</option>
                            <option value="2" selected>2</option>
                            <option value="3">3</option>
                        </select>
                        </div>
                        {/* Quantity Control */}
                        <div className="border bg-white border-gray-400 rounded-md">
                            <button onClick={() => setQuantity(quantity - 1)} className=' text-black w-6  rounded-l'>-</button>
                            <span className='px-2 text-center bg-white'>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className='  text-black w-6 rounded-r'>+</button>
                        </div>
                    </div>
                </div>
                
            </div >
            <div className='flex h-full flex-col justify-between items-end pt-4'>
                <span>
                    {formatPrice(product.price.raw * quantity)}
                </span>
                <div className="cursor-pointer" onClick={() => dispatch(removeFromCart(product.id))}>
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5" d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3"></path>
                    </svg>
                </div>
            </div>


        </div >
    )
}

export default CartItem