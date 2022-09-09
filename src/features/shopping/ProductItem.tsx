import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../cart/cartSlice';
import { Product } from './shoppingSlice'

const ProductItem = (props:{data:Product}) => {
  const dispatch = useAppDispatch();
  const product = props.data;
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="card font-inter">
      <div className='w-72 h-72'>
        <img className='w-full h-full object-cover'  src={product.image.url} alt={product.name}/>
        </div>
        <div className='p-5 flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span className='badge'>Stock ready</span>
          </div>
          <h2 className='product-title'>{product.name}</h2>

          <div>
            <span className='text-xl font-medium'>{product.price.formatted}đ</span>
          </div>

          <div className='mt-5 flex justify-between items-center'>
            <button className='btn-primary' onClick={()=>dispatch(addToCart({id:product.id, quantity:quantity}))}>Add to cart</button>
            <div className=" h-8 flex items-center rounded-full border border-black">
              <button onClick={() => {if(quantity > 1) setQuantity(quantity - 1)}} className=' text-black  w-8 rounded-l'>-</button>
              <span className='w-6 text-center bg-white'>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className='  text-black  w-8 rounded-r'>+</button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default ProductItem