import Product from "./Product";
// import {} from '../features/cart';
import { useDispatch, useSelector } from "react-redux";



function ProductFeed({products}) {


  return (
    <section className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 bg-gray-200">
      {
        products.slice(0,4).map( (product)=>{

          return(
            <Product 
              key={product.id}
              id={product.id}
              title={product.title}
              category={product.category}
              description={product.description}
              isPrime={product.isPrime}
              image={product.image}
              price={product.price}
              rating={product.rating} 
            />
          )

        } )
      }

      <div className="md:col-span-2">
        {
          products.slice(4,5).map( (product)=>{
            return (
              <Product
                key={product.id}
                title={product.title}
                category={product.category}
                description={product.description}
                isPrime={product.isPrime}
                image={product.image}
                price={product.price}
                rating={product.rating} 
              />
            )
          } )  
        }
      </div>    
      {
        products.slice(5).map( (product)=>{
          return (
            <Product
              key={product.id}
              title={product.title}
              category={product.category}
              description={product.description}
              isPrime={product.isPrime}
              image={product.image}
              price={product.price}
              rating={product.rating} 
            />
          )
        } )  
      }


    </section>
  )
}

export default ProductFeed