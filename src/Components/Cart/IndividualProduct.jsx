import React from 'react'
import './Individual.css'


function IndividualProduct({cartProduct}) {
  return (
    <div className='product'>
        <div className="image">
            <img src = {cartProduct.ProductUrl} alt = 'Product Image' />
        </div>
        <br />
        <hr />
        <div className="content">

            <p>{cartProduct.ProductName}</p>
            <br />
            <span>Quantity</span>

            <div className="actions">
              <button className='minus'>Minus</button>
              <div>{cartProduct.qty}</div>
              <button>Plus</button>
            </div>
            
            <div>{cartProduct.TotalProductPrice}</div>
        </div>
    </div>
  )
}

export default IndividualProduct