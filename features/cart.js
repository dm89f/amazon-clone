import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  items:[],
  totalItems:0,
  totalPrice:0
}


export const basketSlice = createSlice({

  name:"cart",
  initialState,
  reducers:{
    addToCart(state, action){
      const productId = action.payload.id;
      let idx = state.items.findIndex( (item)=>(item.id === productId) ) 
      if(idx >= 0){
        if(state.items[idx].qty == 6) return;
        state.items[idx].qty +=1;
      }else{
        state.items.push({ qty:1, ...action.payload });
      }
      state.totalItems +=1
      state.totalPrice +=action.payload.price;
    },
    changeCartItemQty(state, action){
      const {id, qty} = action.payload;
      
      let idx = state.items.findIndex( (item)=>(item.id === id));
      if(idx < 0) return;
      state.items[idx].qty = Number(qty);

      (function updateCartItemsPriceQty(){
        state.totalItems = state.items.reduce((total, item)=>{
          return total += item.qty;
        },0 );
        
        state.totalPrice = state.items.reduce( (total, item)=>{
          return total += item.qty*Number(item.price);
        },0  )

      })()

    },
    deleteCartItem(state, action ){
      
      const {id} = action.payload;
      let updatedItems = []

      for( let item of state.items ){

        if( item.id === id ) continue;
        updatedItems.push(item)

      }

      state.items = updatedItems;

      (function updateCartItemsPriceQty(){

        state.totalItems = state.items.reduce((total, item)=>{
          return total += Number(item.qty);
        },0 );
        state.totalPrice = state.items.reduce( (total, item)=>{
          return total += Number(item.qty)*Number(item.price);
        },0  )
      })();



    }
  }

})

export const getCartItems = (state)=>( state.cart.items );
export const getCartItemsLength = (state)=>(state.cart.totalItems)
export const getCartItemsPrice = (state)=>(state.cart.totalPrice.toFixed(2))


export const {addToCart, changeCartItemQty, deleteCartItem} = basketSlice.actions;
export default basketSlice.reducer;