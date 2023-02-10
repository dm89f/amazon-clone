import moment from "moment"
import Image from "next/dist/client/image"


function Order({ id, amount, amountshipping, items, timeStamp, images }) {
  
  
  return (
    <div className="relative border rounded-md ">
       <div className="flex items-center space-x-10 p-1 md:p-5 bg-gray-100 text-sm text-gray-600">
          <div>
            <p className="font-bold text-xs">Order Placed</p>
            <p>{moment.unix(timeStamp).format('DD MM YYYY HH:MM')}</p>
          </div>

          <div>
            <p className="text-xs font-bold">Total</p>
            <p className="text-green-700 font-bold">₹ {" "} {amount}</p>
            <p>{amountshipping}</p>
          </div>
          <p className="text-sm whitespace-nowrap sm:text-lg self-end flex-1 font-bold text-right text-blue-600">{items.length} items</p>
          <p className="absolute top-2 right-2 w-40 lg:w-96 text-xs truncate ">
            Order #{" "}{id}
          </p>
         
       </div>

        <div className="p-5 sm:p-10 ">
          <div className="flex space-x-6 overflow-x-auto" >
            {
              images.map( (image, idx) =>{
                return(
                  <img key={idx} className="h-20 object-contain sm:h-32" src={image} alt={id}/>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Order