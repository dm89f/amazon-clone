import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import ProductFeed from '@/components/ProductFeed';

export default function Home({products}) {


  return (
    <div className='h-screen-full'>
      <Header/>   
      <main className='max-w-screen-2xl mx-auto bg-gray-100'>
        <Banner/>
        <ProductFeed products={products}/>
      </main>  
    </div>
  )
}

const END_POINT = 'https://fakestoreapi.com/products';


export async function getServerSideProps(ctx){

  let products=[];
  try{
  
    let res = await fetch(END_POINT);
    let temp = await res.json();
    products = temp.map( (prod)=>({
      ...prod,
      isPrime:Math.random()>0.3,
      price:prod.price*40
    }) )
  }catch(err){

    console.log(err.message);

  }
  return {
    props:{
      products
    }
  }
}