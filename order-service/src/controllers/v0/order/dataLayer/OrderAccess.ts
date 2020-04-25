import {Order} from "../models/Order";

export  class OrderAccess {

  constructor(){
  }

  async getAllOrdersByBuyerId(buyerId: number) : Promise<Order[]>{

    const orders = await Order.findAll({
      where: {
        buyer_id: buyerId
      }
    });

    if( orders.length !== 0 ){
      console.log('Found orders:', orders.length);
    }
   return orders;
  }

  async getAllOrders() : Promise<Order[]>{
    const orders = await Order.findAll( {order: [['createdAt', 'DESC']]});
    if( orders.length !== 0 ){
      console.log('Found orders:', orders.length);
    }
    return orders;
  }

}