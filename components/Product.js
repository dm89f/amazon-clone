import React from 'react'
import Image from 'next/image'
import {StarIcon} from '@heroicons/react/solid'



function Product({ title, category, description, image, price, rating,isPrime  }) {

  console.log(rating)

  return (
    <div className='flex flex-col p-5 m-5 bg-white relative '>
      <span className=' absolute top-1 right-1 font-xs italic text-gray-500'>{category}</span>
      <div className='h-64 flex flex-col items-center'>
        <Image 
          className='mx-auto  mb-3'
          src={image} 
          height={150} 
          width={150}
          style={{objectFit:"cover"}}
        />
      </div>
      <h3 className='text-md font-extrabold mb-3'>
        {title}
      </h3>
      <div className='flex mb-3'>
        {
          Array(Math.floor(rating.rate)).fill().map( (_, idx)=>{
            return(
              <StarIcon className='text-yellow-500' width={20} height={20} key={idx} />
            )
          } )
        }
        {
          (rating.rate - Math.floor(rating.rate > 0) &&  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M 9.049,2.927 C 9.1985626,2.4678429 9.5974148,2.2375949 9.9968701,2.2362559 l -5.9e-6,11.8199721 C 9.7915851,14.056767 9.5864369,14.120358 9.412,14.247 l -2.8,2.034 C 5.828,16.851 4.774,16.084 5.073,15.163 l 1.07,-3.292 C 6.276704,11.45883 6.1297413,11.007444 5.779,10.753 L 2.98,8.72 C 2.197,8.15 2.6,6.91 3.568,6.91 H 7.029 C 7.4619424,6.9101141 7.8457879,6.6316142 7.98,6.22 L 9.05,2.928 Z" />
        </svg> )
        }({rating.count})
      </div>

      <p className='flex items-center mb-3'>
        <Image className='mr-2' src={'/images/Prime-tag.png'} width={60} height={60}/>
        Free Next-day Delivery
      </p>

      <p className='line-clamp-2 mb-3'>
        {description}
      </p>
      <p className='mb-3 font-bold text-green-800'>
        ₹{" "}{price.toFixed(2)}
      </p>
      

      <button className='button w-full mt-auto'>Add to Basket</button>

    </div>
  )
}

export default Product