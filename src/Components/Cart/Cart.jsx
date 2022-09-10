//import { ShoppingCart } from '@mui/icons-material';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../global/CartContext';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {

  const {shoppingCart, dispatch, totalPrice, totalQty} = useContext( CartContext )
  //const data = useContext(CartContext)
  //console.log(data);
  console.log(shoppingCart);

  return (
    <>
    {shoppingCart.length !== 0 && <h1>Cart</h1>}
      <div className = 'cartcontainer'>
       {
        shoppingCart.length === 0 && <>
         <div><strong>You have no iems in your cart. Start <Link to = '/' >adding some</Link></strong> </div>
        </>
       }

       {shoppingCart && shoppingCart.map(cart => (

        <div className = 'cartcard' key={cart.ProductId} >

          <div className="cartimage">
            <img src = {cart.ProductUrl} alt = " " />
          </div>

          <div className="name">
            {cart.ProductName}
          </div>

          <div className="originalprice">
            Ksh {cart.ProductPrice}
          </div>

          <div className="inc" onClick={() => dispatch({ type : 'INC', id: cart.ProductId, cart})}>
            <AddIcon/>
          </div>

          <div className="quantity">
            {cart.qty}
          </div>

          <div className="dec" onClick={() => dispatch({ type : 'DEC', id: cart.ProductId, cart})}>
            <RemoveIcon />
          </div>

          <div className='cart-price'>
              Ksh {cart.TotalProductPrice}
          </div>

          <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
          <DeleteIcon/>
          </button>
          

        </div>
       ))
       }
        {shoppingCart.length > 0 && <div className='cart-summary'>
              <div className='cart-summary-heading'>
                  Cart-Summary
              </div>
              <div className='cart-summary-price'>
                  <span>Total Price</span>
                  <span>{totalPrice}</span>
              </div>
              <div className='cart-summary-price'>
                  <span>Total Qty</span>
                  <span>{totalQty}</span>
              </div>
              
          </div>
          }
      </div>

    </>
  )
}

export default Cart