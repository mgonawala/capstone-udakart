import {Router, Response, Request, NextFunction, response} from 'express';
import {OrderAccess} from "../dataLayer/OrderAccess";
import {CreateOrderRequest} from "../request/CreateOrderRequest";
import {Order} from "../models/Order";
import {OrderItem} from "../models/OrderItem";
import Axios from "axios";
import {config} from "../../../../config/config";
import * as http from 'http';
import {validateOrder} from "../../../../../service/OrderService";
import {updateInventory} from "../../../../../service/ProductService";


const c = config.dev;
const router: Router = Router();
const orderAccess:OrderAccess = new OrderAccess();

export async function requireAuth(req: Request, res: Response, next: NextFunction) {


    console.log(c.users_api_url);
    console.log(c.users_api_host);
    console.log(req.headers.authorization)
    console.log(`${c.users_api_host}/${c.users_api_url}`);
    // TODO change url to backend-user in environment file
    //http://backend-user:8080/api/v0/users/auth/verification
    await Axios.get(`${c.users_api_host}${c.users_api_url}`,{
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type':'application/json'
      },
      validateStatus: status1 => {
        return status1 <600
      }
    }).then(response => {
      console.log('data:', response.status);
      if( response.status !== 200){
        return res.status(response.status).send(response.data.message);
      }
      return next();
    })
  .catch(error => {
    console.log('error:'+error);
    return res.status(500).send({message: error.message})
  });
}

// get all orders
router.get('/',
    requireAuth,
    async (request: Request, response: Response) => {

  console.log('Get all prders.')

  const items = await orderAccess.getAllOrders();
  response.status(200).send({
    items: items
  });

});

// Retrieve all orders of a buyer
router.get('/:id',
    requireAuth,
    async (request: Request, response: Response) => {
  let {id} = request.params;
  console.log('Id:', id);
  const item = await orderAccess.getAllOrdersByBuyerId(id);
  if(item)
    response.status(200).send(item);
  else
    response.status(404).send({
      message: 'Product with given Id not found.'
    });

});

// Create a new Order Item
router.post('/',
    requireAuth,
    async ( request: Request, response: Response) => {

  const createOrderRequest = request.body as CreateOrderRequest;
  console.log(JSON.stringify(createOrderRequest));
  // Validate Request parameters
  if( !createOrderRequest.buyerId ){
    return response.status(400).send({
      message: 'Buyer ID is a required field'
    });
  }
  if( !createOrderRequest.address ){
    return response.status(400).send({
      message: 'Address is a required field'
    });
  }

  if( !createOrderRequest.products ){
    return response.status(400).send({
      message: 'Please provide product details'
    });
  }
  let total = 0;
  createOrderRequest.products.forEach((product) => {
    let price = product.quantity * product.price;
    total = price + total;
  });

  const result = await validateOrder(createOrderRequest);
  console.log(result,'result')
  if( result.status == true){
    const order = await Order.create({
      buyer_id: createOrderRequest.buyerId,
      address: createOrderRequest.address,
      status: 'NEW',
      total: total,
      products: createOrderRequest.products
    }, {
      include: [OrderItem]
    });
    await updateInventory(result.items);
    response.status(201).send({
      order
    });
  }
  else{
    response.status(400).send({
      message: result.message
    });
  }





});


export const OrderRouter: Router = router;
