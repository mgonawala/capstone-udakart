import React, {useEffect, useState} from 'react';
import {useAppContext} from "../lib/contextLib";
import "./ShoppingCart.css"
import {useFormFields} from "../lib/formHooks";
import CartRow from "./CartRow";
import CartTotal from "./CartTotal";

export default function ShoppingCart() {

    const {cartItems, setCartItems} = useAppContext();
    function deleteCartItem(id) {
        let array = [...cartItems];
        let item = array.filter( cart => cart.id == id);
        if( item.length !== 0) {
            let oldItems = array.filter(cart => cart.id !== id);
            setCartItems(oldItems);
            localStorage.setItem("cartItems", JSON.stringify(oldItems));
        }
    }
    function updateCartItem(id, quantity){
        console.log(id,quantity);
        let array = [...cartItems];
        let item = array.filter( cart => cart.id == id);
        console.log(item, 'old item')
        if( item.length !== 0) {
            let oldItems = array.filter(cart => cart.id !== id);
            console.log(oldItems,'oldItems')
            let newItems = array.filter(cart => cart.id == id).map(cart => ({
                name: cart.name,
                id: cart.id,
                quantity: quantity,
                unitPrice: cart.unitPrice,
                imageUrl: cart.imageUrl
            }));
            setCartItems(oldItems.concat(newItems));

            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }

    useEffect(()=> {
        onLoad();
    },[])


    function onLoad() {
        console.log('rerendering shopping cart')
        let items = JSON.parse(localStorage.getItem("cartItems"));
        console.log(items);
        if( items !== null && items.length !== 0 ){
            setCartItems(items);
        }
    }

    function tableRows(){
        return(
            cartItems.map( (item,index) => (
               <CartRow item={item} index={index} key={item.id} updateCartState={updateCartItem} deleteCartItem={deleteCartItem}/>
            ))
        );
    }
    return(
        <div className={"container table-container"} >

            <div className={"row"}>
                <div className={"col-md"}>
                    <table className={"table table-bordered rounded"}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={"row"}>

                <CartTotal/>

            </div>
        </div>
    );
}
