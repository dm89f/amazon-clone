import React, { useState } from 'react'
import {StarIcon} from '@heroicons/react/solid'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import {changeCartItemQty, addToCart, deleteCartItem} from '../features/cart'



function CartItem({id, title,qty, category, description, image, price, rating,isPrime}) {

  const dispatch = useDispatch();

  function handleQtyChange(e){
   dispatch( changeCartItemQty({id, qty:e.target.value}));
  }

  function handleAddToCart(){
    dispatch( addToCart( { id, title, qty, category, description, image, price, rating,isPrime } ) )
  }

  const handleDeleteCartItem = ()=>{
    dispatch(deleteCartItem({id:Number(id)})  )
  }



  return (
    <div className='flex flex-col md:flex-row mb-3 shadow-lg shadow-gray-300/50'>
      <div className='p-3 w-80 mx-auto'>
        <Image src={image} alt={title} height={200} width={200} style={{objectFit:'contain'}} />
      </div>
      <div className='p-3'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <div className='flex flex-row'>
          {
            Array(Math.floor(rating.rate)).fill().map( (_, idx)=>{
              return(
                <StarIcon className='text-yellow-500' width={20} height={20} key={idx} />
              )
            } )
          }
          {
            (rating.rate - Math.floor(rating.rate > 0) &&  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M 9.049,2.927 C 9.1985626,2.4678429 9.5974148,2.2375949 9.9968701,2.2362559 l -5.9e-6,11.8199721 C 9.7915851,14.056767 9.5864369,14.120358 9.412,14.247 l -2.8,2.034 C 5.828,16.851 4.774,16.084 5.073,15.163 l 1.07,-3.292 C 6.276704,11.45883 6.1297413,11.007444 5.779,10.753 L 2.98,8.72 C 2.197,8.15 2.6,6.91 3.568,6.91 H 7.029 C 7.4619424,6.9101141 7.8457879,6.6316142 7.98,6.22 L 9.05,2.928 Z" />
          </svg> )
          }({rating.count})
        </div>
        <div>
          {
            isPrime&&<p className='flex items-center '>
            <Image alt={title} className='mr-2 ' src={'/images/Prime-tag.png'} width={60} height={60}/>
            Free Next-day Delivery
          </p>
          }
        </div>
        <div className='line-clamp-4 mb-3'>
          {description}
        </div>
        <p className='mb-3 text-lg font-bold text-green-800'>
        ₹{" "}{price.toFixed(2)}
      </p>
      <div className='mb-3 flex items-center space-x-3'>
        <div>
          <label htmlFor="qty"/>
          <select className='p-3 rounded-md' name="qty" value={qty} onChange={handleQtyChange} id="qty">
              <option value="">Quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
          </select>
        </div>
        <div onClick={handleDeleteCartItem} className=' text-sm font-bold link'>
          <p>Delete Item</p>
        </div>
      </div>
      <button onClick={handleAddToCart} className='text-lg button w-full mt-auto'>Add to Basket</button>


      </div>


      <div></div>
    </div>
  )
}

export default CartItem