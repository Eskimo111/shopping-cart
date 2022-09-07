import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../cart/cartSlice';
import { Product } from './shoppingSlice'

const ProductItem = (props:{data:Product}) => {
  const dispatch = useAppDispatch();
  const product = props.data;
  return (
    <div className="card font-inter">
        <img className='w-full h-full object-cover'  src={product.image.url} alt={product.name}/>
        <div className='p-5 flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span className='badge'>Stock ready</span>
          </div>
          <h2 className='product-title'>{product.name}</h2>

          <div>
            <span className='text-xl font-medium'>{product.price.formatted}đ</span>
          </div>

          <div className='mt-5 flex gap-2'>
            <button className='btn-primary' onClick={()=>dispatch(addToCart({id:product.id, quantity:1}))}>Add to cart</button>
          </div>
        </div>
    </div>
  )
}

export default ProductItem