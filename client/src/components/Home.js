

import React,{useEffect, useState} from 'react';
import "./Home.css";
import Axios from 'axios';
import Card from "./Card";
import {useAppContext} from "../lib/contextLib";
import {getAllProducts} from "../lib/ProductsLib"

export default function Home({isAuthenticated}){


  const [products, setProducts] = useState([]);
  const {cartItems, setCartItems, email} = useAppContext();
  const isAdmin = email == 'admin@gmail.com' ? true : false
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const products = await getAllProducts();
    setProducts(products);
    /*setProducts([{
      "id":"1",
      "name":"Bottle",
      "quantity":23,
      "unitPrice": 20,
      "imageUrl":'https://i.picsum.photos/id/836/200/300.jpg'
    },
      {
        "id":"2",
        "name":"Bottle",
        "quantity":23,
        "unitPrice": 20,
        "imageUrl":'https://i.picsum.photos/id/836/200/300.jpg'
      },
      {
        "id":"3",
        "name":"Bottle",
        "quantity":23,
        "unitPrice": 20,
        "imageUrl":'https://i.picsum.photos/id/836/200/300.jpg'
      },
      {
        "id":"4",
        "name":"Bottle",
        "quantity":23,
        "unitPrice": 200,
        "imageUrl":'https://i.picsum.photos/id/836/200/300.jpg'
      }
    ]);*/
  }

  function renderHome(){
    return (
        <div className="lander">
          <h1> Udakart Shopping App</h1>
          <p> A simple clone of E-commerce website</p>
        </div>

    );
  }

  function renderProducts() {
    return(
        <div className={"container products"} >
        <div className={"row"}>

          { products!=null && products.map( product =>
            <Card id={ product.id} name={product.name} unitPrice={product.unitPrice} key={product.id} imageUrl={product.imageUrl}
            addToCart={addToCart} quantity={product.quantity} isAdmin={isAdmin}/>
          )}
        </div>
        </div>
    );
  }

  async function updateCartState(){

  }
  async function addToCart({id,name,unitPrice, imageUrl}) {
    let array = [...cartItems];
    let item = array.filter( cart => cart.id == id);
    if( item.length !== 0){
      let oldItems = array.filter(cart => cart.id !== id);
      let newItems = array.filter( cart => cart.id == id).map( cart=> ( {
             name: cart.name,
            id: cart.id,
            quantity: cart.quantity + 1,
            unitPrice: cart.unitPrice,
          imageUrl: cart.imageUrl
      }));
      let newArray = oldItems.concat(newItems);
      await setCartItems(newArray);
      localStorage.setItem("cartItems",JSON.stringify(newArray));
      console.log(localStorage.getItem("cartItems"))
    }
    else{
      item = {
        name: name,
        id: id,
        unitPrice: unitPrice,
        quantity: 1,
        imageUrl: imageUrl
      };
      let newArray = cartItems.concat(item);
      await setCartItems(newArray);
      console.log(cartItems);
      localStorage.setItem("cartItems",JSON.stringify(newArray));
      console.log(localStorage.getItem("cartItems"))
    }



  }
  return(
    <div className="Home">
      {isAuthenticated? renderProducts(): renderHome()}
    </div>
  );
}
