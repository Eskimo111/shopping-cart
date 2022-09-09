import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'

const formatPrice = (price: number) => {
    return price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

const CheckOut = () => {
    const subtotal = useAppSelector((state:RootState) => state.cart[0].subtotal.raw);
    const [discount, setDiscount] = useState(0);
    return (
        <div className='basis-1/3 flex flex-col gap-4 px-2 font-inter'>
            <h2 className='text-2xl font-bold mb-8'>Check out</h2>
            <div className='flex flex-col gap-2 pb-6 border-b'>
                <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className='flex justify-between'>
                    <span>Discount</span>
                    <span>{formatPrice(discount)}</span>
                </div>
            </div>
            <div className='pb-6 border-b'>
                <div className='flex justify-between'>
                    <span>Total</span>
                    <span>{formatPrice(subtotal-discount)}</span>
                </div>
                
            </div>
            <button className='btn-primary' >Guest Checkout</button>
            <button className='btn-primary'>Member Checkout</button>
        </div>
    )
}

export default CheckOut