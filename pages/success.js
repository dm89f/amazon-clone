import React, { useEffect } from 'react'
import {CheckCircleIcon} from '@heroicons/react/solid'
import Header from '../components/Header'
import {useRouter} from 'next/router'


function Success() {

  const router = useRouter();

  return (
    <div className='bg-gray-100 h-screen'>
      <Header/>
      <main className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col  p-10 bg-white'>
          <div className='flex item-center  space-x-2 mb-5'>
            <CheckCircleIcon color='green' className='h-10'/>
            <h1 className='text-3xl '>Thank you, Your Order has been Confirmed</h1>
          </div>
          <p className='mb-5'>
            Thank you for shopping with us. We will Send a confirmation of Email that Item has shipped.
          </p>
          <button role={'li'} onClick={()=>{router.push('/orders')}} className='button text-lg'>Go to my Orders</button>
        </div>
      </main>
    </div>
  )
}

export default Success