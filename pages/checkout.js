import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {getCartItemsLength, getCartItemsPrice ,getCartItems} from '../features/cart'
import CartItem from '@/components/CartItem'
import {loadStripe} from '@stripe/stripe-js'
import {useSession} from 'next-auth/react'
import { useState } from 'react'

const stripePromise = loadStripe(process.env.stripe_public_key)



export default function Checkout(){

  const cartItems = useSelector(getCartItems);
  const session = useSession();

  const [ loading, setLoading ] = useState(false);


  async function handleCheckout(e){
    const stripe = await stripePromise;
    e.preventDefault();
    setLoading(true);
    try{

      const res = await fetch( '/api/checkout_sessions',{
        method:'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify({cartItems, email:session.data.user.email})
      });

      const {id:sessionId} = await res.json();

      const result  = await stripe.redirectToCheckout( { sessionId:sessionId } )


    }catch(err){

      console.log(err)

    }

    setLoading(false);

  }  

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
            !session.data?.user&&<h2 className='text-xl font-bold text-yellow-900 py-2 mb-2 '>
              Please Login to Make an Order
            </h2>
          }
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
          <button   
            onClick={handleCheckout}
            disabled={!session} 
            className={`button text-lg ${!session.data?'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed':""}`}
            >
              { loading?"Loading ...":"Buy Now" }
            </button>          
        </div>
      </main>
    </div>
  )

}