import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {getCartItemsLength, getCartItemsPrice ,getCartItems} from '../features/cart'
import CartItem from '@/components/CartItem'


export default function checkout(){

  const cartItems = useSelector(getCartItems);

  // console.log(cartItems)

  return(
    <div className='bg-gray-100'>
      <Header/>
      <main className='max-w-screen-2xl mx-auto flex flex-col md:flex-row'>
        
        <div className='p-5 flex-grow bg-white'>
          <div className='mb-2'>
            <Image
              className='' 
              width={1250}
              height={50}
              src={'/images/checkout_banner.png'}
              style={{objectFit:'contain'}}
              alt='checkout-banner'
            />
          </div>
          <h1 className='text-3xl py-2 mb-2 border-b-2 border-b-yellow-300'>Shopping Basket</h1>
          {
            cartItems.map( (item)=>(
              <CartItem
                key={item.id}
                id={item.id}
                qty={item.qty}
                title={item.title}
                category={item.category}
                description={item.description}
                isPrime={item.isPrime}
                image={item.image}
                price={item.price}
                rating={item.rating} 
              />
            ) )
          }
        </div>

        {/* right checkout Btn */}
        <div className='flex flex-grow flex-col bg-white mx-5 px-5 py-5'>
          <p className='text-lg whitespace-nowrap mb-2'>
            Subtotal({useSelector(getCartItemsLength)}){" "}: 
            <span className='mx-2 text-xl font-extrabold text-green-800 '>₹ {useSelector(getCartItemsPrice)}</span>
          </p>          
          <button className='button text-lg'>Buy Now</button>          
        </div>
      </main>
    </div>
  )

}