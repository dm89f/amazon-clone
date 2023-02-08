import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'


export default function Home() {
  return (
    <div className='h-screen-full'>
      <Header/>   
      <main className='max-w-screen-2xl mx-auto bg-gray-100'>
        <Banner/>
      </main>  
    </div>
  )
}
