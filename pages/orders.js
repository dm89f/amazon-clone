import Header from '../components/Header';
import {getSession, useSession} from 'next-auth/react'
import moment from 'moment';
import db from '../firebase';
import Order from '../components/Order';

export default function Orders({orders}){

  const session = useSession();

  return (<div>
    <Header />
    <main className='max-w-screen-lg mx-auto p-10'>
      <h1 className='text-3xl Your Orders border-b border-yellow-400 mb-2 pb-1' >
        Your Orders
      </h1>
      {
        session.data ? (
          <h2>{orders && orders.length} orders</h2>
        ):
        (
          <h2 className='font-bold text-yellow-900'>Please Sign in to see your Orders</h2>
        )

      }

      <div className='mt-5 space-y-4 '>
        {
          orders&&orders.map((order,idx)=>{
            return (<Order 
              key={idx}
              id={order.id} 
              amount={order.amount}
              amountshipping={order.amountshipping} 
              items={order.items}
              timeStamp={order.timeStamp} 
              images={order.images} 
            />)
          })
        }
      </div>
    </main>

  </div>)

}



export async function getServerSideProps(context){

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const session = await getSession(context);
  
  if( !session){
    return {
      props:{"nosession":"nosession"}
    }
  }

  // firebase DB
  const stripeOrders = await db
    .collection('users')
    .doc(session.user.email)
    .collection("orders")
    .orderBy('timestamp', 'desc')
    .get();

  // Stripe Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order)=>{
    return {
      id:order.id, 
      amount:order.data().amount,
      amountShipping:order.data().amount_shipping,
      images:order.data().images,
      timeStamp:moment( order.data().timestamp.toDate()).unix(),
      items: ( await stripe.checkout.sessions.listLineItems(order.id, {limit:100 })).data,      
    }
  }));


  return {
    props:{
        orders
    }

  }
}