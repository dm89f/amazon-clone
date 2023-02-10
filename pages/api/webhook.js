import { buffer } from "micro"
import * as admin from 'firebase-admin';
const serviceAccount = require('../../firebase-adminsdk-service-account.json');

// setup connection to firebase db for local firebase-admin cli
const app = !admin.apps.length 
            ? admin.initializeApp({credential:admin.credential.cert(serviceAccount) }) 
            : admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endPointSecret = process.env.STRIPE_SIGNING_SECRET


export default async (req, res) =>{

  if( req.method === 'POST' ){

    const reqBuffer = await buffer(req);
    const payLoad = reqBuffer.toString();
    const signature = req.headers['stripe-signature'];

    let event;
    try{
      event = stripe.webhooks.constructEvent(payLoad, signature, endPointSecret);
      // console.log("key signature valid")
    }catch(err){
      console.log("Error:",err);
      res.status(400).json({err:`Webhook Error ${err.message}`})
    }

    if ( event.type === 'checkout.session.completed' ){
      try{
        // fullfill the order
        const session = event.data.object;
        await fullFillOrder(session);
        // console.log(`Success : Order  ${session.id} had been added to the DB`);
        res.status(200).send('data added to DB')

      }catch( err ){
        console.log("Webhook Error", err)
        res.status(400).send({"Webhook error":err})
      }

    }else{
      console.log(event.type);
      res.status(200).send("ok");
    }


  }else{
    res.status(400).send({'error':"invalid request"});
  }

}

export const config = {
  api:{
    bodyParser:false,
    externalResorver:true
  }
}


const fullFillOrder = async(session)=>{

  await app.firestore()
            .collection('users')
            .doc(session.metadata.email)
            .collection('orders')
            .doc(session.id)
            .set({amount:session.amount_total / 100,
              amount_shipping:session.total_details.amount_shipping/100,
              images:JSON.parse(session.metadata.images),
              timestamp:admin.firestore.FieldValue.serverTimestamp(),
            });
}
