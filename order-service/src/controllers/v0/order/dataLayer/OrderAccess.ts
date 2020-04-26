import {Order} from "../models/Order";

export  class OrderAccess {

  constructor(){
  }

  async getAllOrdersByBuyerId(buyerId: string) : Promise<Order[]>{

    try {
      const orders = await Order.findAll({
        where: {
          buyer_id: buyerId
        }
      });
      console.log(`Orders of buyer ${buyerId}: ${orders.length}`);
      if (orders.length !== 0) {
        console.log('Found orders:', orders.length);
      }
      return orders;
    }
    catch (error) {
      console.log('Could not fetch orders.', error);
      return [];
    }
    return [];
  }

  async getAllOrders() : Promise<Order[]>{
    const orders = await Order.findAll( {order: [['createdAt', 'DESC']]});
    if( orders.length !== 0 ){
      console.log('Found orders:', orders.length);
    }
    return orders;
  }

}