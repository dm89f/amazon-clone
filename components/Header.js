import Image from "next/image"
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { useRouter } from "next/router";
import {useSelector} from 'react-redux'
import {getCartItemsLength} from '../features/cart'


function Header() {

  const totCartItems = useSelector(getCartItemsLength);
  const router = useRouter();

  function gotoCheckout(e){
    e.preventDefault();
    router.push('/checkout')
  }

  function gotoRetOrders(e){
    e.preventDefault();
    router.push('/orders')
  }

  function gotoHome(e){
    e.preventDefault();
    router.push('/')
  }


  return (
    <header className="bg-amazon_blue ">

      <div className="flex items-center py-2">       
        <Image
          onClick={gotoHome}
          alt='logo'
          src='/images/amazon_png.png'
          width={150}
          height={30}
          className='cursor-pointer px-2 pt-3'
        />
        {/* left */}
        <div className="hidden sm:flex px-2 items-center flex-grow">
          
          <input
            className="p-2 h-10 w-auto flex-shrink flex-grow outline-none rounded-l-md" type="text" name="search" id="search"
            placeholder="Search"
          />
          <div 
            className="bg-yellow-400 p-1 px-3 hover:bg-yellow-500 rounded-r-md"
            type="button"
            value="submit"
          >
            <SearchIcon className="" width={32} height={32}/>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center space-x-4 mx-4 ml-auto link">
          <div className="hover:underline text-white"> 
            <p className="text-sm md:text-lg  whitespace-nowrap">Hello Sign in</p>
            <p className="text-sm md:text-lg  font-bold whitespace-nowrap">Account & Lists</p>
          </div>
          <div onClick={gotoRetOrders} className="hover:underline text-white link"> 
            <p className="text-sm md:text-lg  whitespace-nowrap ">Return </p>
            <p className="text-sm md:text-lg  whitespace-nowrap font-bold">& Orders</p>
          </div>
          <div onClick={gotoCheckout} className="relative flex items-center text-white link" >
            <ShoppingCartIcon className=" h-12 w-12"/>
            <span className="text-sm font-extrabold absolute top-0 left-7 px-1 rounded-full text-black bg-yellow-500">{totCartItems}</span>
            <p className="hidden lg:block font-bold text-xl link">Basket</p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="px-3 py-2 flex items-center bg-amazon_blue-light">
        <div className="flex items-center text-white space-x-2 mr-2 text-sm">
          <MenuIcon className="text-white h-6"/>
          <p className="link">All</p>
          <p className="link">Prime Video</p>
        </div>
        <div className="hidden md:flex  items-center text-sm text-white space-x-2 ">
          <p className="link">Electronics</p>
          <p className="link">Food & Grocery</p>
          <p className="link">Prime</p>
          <p className="link">Buy Again</p>
          <p className="link">Shopper Toolkit</p>
          <p className="link">Health & personal care</p>
        </div>
      </div>
    </header>
  )
}

export default Header