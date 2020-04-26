import React, {useEffect, useState} from 'react';
import CartRow from "./CartRow";
import {getOrders} from "../lib/OrdersLib";
import {useAppContext} from "../lib/contextLib";
import OrderSummaryRow from "./OrderSummaryRow";
import Card from "./Card";

export default function OrderSummary() {


  const [orders, setOrders] = useState([]);
  const {email, authToken} = useAppContext();

  useEffect(()=> {
    onLoad();
  },[])


 async function onLoad() {
    const items = await getOrders(email, authToken);
    console.log(items);
    if(items.length !== 0 ){
      setOrders(items.items);
    }
  }


  function tableRows(){
    return(

        orders.map( (item,index) => (
            <OrderSummaryRow item={item} index={index} key={item.id} />
        ))
    )
  }
  return(
      <div className={"container"}>
        <div className={"mx-auto mt-4 text-center"}>
          <h1>Your Orders</h1>
        </div>

        <div className={"row"}>
          <div className={"col-md"}>
            <table className={"table table-bordered rounded"}>
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Order Id</th>
                <th scope="col">Order Date</th>
                <th scope="col">Order Status</th>
                <th scope="col">Total Price</th>
              </tr>
              </thead>
              <tbody>
              {tableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}