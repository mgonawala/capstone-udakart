import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

export default function Card({id,imageUrl, name, category, unitPrice, addToCart, quantity, isAdmin}) {
  return(
      <div className={"col-sm-3"}>
      <div className="card h-75" >
        <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body text-center">
            <h5 className="card-title">{name} </h5>
            <p className="card-text">
              Unit Price: {unitPrice}
            </p>
              <p className="card-text">
                  Available: {quantity}
              </p>
          </div>
          <div className="card-img-overlay">

              { quantity>0 &&  !isAdmin &&
              <a href="#" className="btn btn-primary" onClick={() => addToCart({id,name,unitPrice, imageUrl})}>Add To Cart</a> }
              { quantity <=0 && !isAdmin &&
              <a href="#" className="btn btn-primary disabled" onClick={() => addToCart({id,name,unitPrice, imageUrl})}>Add To Cart</a> }
          </div>
      </div>
      </div>
  )
}
