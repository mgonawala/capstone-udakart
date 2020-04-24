import React from "react";
import {useAppContext} from "../lib/contextLib";
import {createOrder} from "../lib/OrdersLib";



export default function CartTotal(){

    const {cartItems, setCartItems, authToken} = useAppContext();

    function totalPrice(){
        return cartItems.reduce((total, item)=> total + (item.unitPrice * item.quantity),0);
    }

    async function placeOrder() {
        console.log('Placing order.')
        const result = await createOrder(cartItems, setCartItems, authToken)
        console.log(result);
        alert(result.message);
    }

    return(
        <div className={"col"} style={{"marginBottom": 10}}>
            <div className={"container "}>
            <div className={"row float-right"}>
                <div className={"col-md-7"}>
                    <h3> Total: {totalPrice()}</h3>
                </div>
                <div className={"col-md-5"}>
                    <button type={"submit"} className={"btn btn-primary"} onClick={placeOrder}> Checkout </button>
                </div>
            </div>
            </div>
        </div>
    );
}
