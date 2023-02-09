const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      const { email, cartItems } = req.body;  
      const line_items = cartItems.map( (item)=>({
        quantity:1,
        price_data:{
          currency:'inr',
          product_data:{
            name:item.title,
            description:item.description,
            images:[item.image],

          },            
          unit_amount_decimal:item.price*100,
        },
        
      }))

      const session = await stripe.checkout.sessions.create({
        line_items: [
          ...line_items
        ],
        shipping_options:[
          {
            shipping_rate:'shr_1MY4QXSBE9fx1JJ1xHIcDSDw'
          }
        ],
        shipping_address_collection:{
          allowed_countries:['IN','US','CA']
        },
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata:{
          email:email,
          images:JSON.stringify(cartItems.map( (item)=>(item.image) ))
        }
      });

      return res.status(302).json({id:session.id});

      
    } catch (err) {
      console.log(err)
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}