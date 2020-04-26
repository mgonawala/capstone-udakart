import {Router, Response, Request, NextFunction, response} from 'express';
import {OrderAccess} from '../dataLayer/OrderAccess';
import {CreateOrderRequest} from '../request/CreateOrderRequest';
import {Order} from '../models/Order';
import {OrderItem} from '../models/OrderItem';
import Axios from 'axios';
import {config} from '../../../../config/config';
import * as http from 'http';
import {validateOrder} from '../../../../../service/OrderService';
import {updateInventory} from '../../../../../service/ProductService';


const c = config.dev;
const router: Router = Router();
const orderAccess: OrderAccess = new OrderAccess();

// Check if token is JWT token is valid or not
export async function requireAuth(req: Request, res: Response, next: NextFunction) {

  try {
    const result = await Axios({
      method: 'get',
      url: `http://${process.env.USERS_SERVICE}/api/v0/users/auth/verification`,
      headers:
          {
            'Authorization': `${req.headers.authorization}`,
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
          },
      validateStatus: (status) => {
        return status < 600;
      }
    });
    if ( result.status !== 200) {
      return  res.status(result.status).send(result.data.message);
    }
    return next();
  }
  catch( e ) {
    console.log('error:', e);
    return res.status(500).send({message: e.message});
  }
}

// Health check endpoint
router.get('/healthz', async (req: Request, res: Response) => {
  console.log('Health Check');
  res.status(200).send('OK');
});

// get all orders
router.get('/',
    requireAuth,
    async (request: Request, response: Response) => {
    const items = await orderAccess.getAllOrders();
    response.status(200).send({
      items: items
    });

});

// Retrieve all orders of a buyer
router.get('/users/:id',
    requireAuth,
    async (request: Request, response: Response) => {
  const {id} = request.params;
  console.log('Id:', id);
  const item = await orderAccess.getAllOrdersByBuyerId(id);
  if (item) {
    response.status(200).send(item);
  } else {
    response.status(404).send({
      message: 'Product with given Id not found.'
    });
  }

});

// Create a new Order Item
router.post('/',
    requireAuth,
    async ( request: Request, response: Response) => {

  const createOrderRequest = request.body as CreateOrderRequest;
  console.log(JSON.stringify(createOrderRequest), 'create order request');
  // Validate Request parameters
  if ( !createOrderRequest.buyerId ) {
    return response.status(400).send({
      message: 'Buyer ID is a required field'
    });
  }
  if ( !createOrderRequest.address ) {
    return response.status(400).send({
      message: 'Address is a required field'
    });
  }

  if ( !createOrderRequest.products ) {
    return response.status(400).send({
      message: 'Please provide product details'
    });
  }
  let total = 0;
  createOrderRequest.products.forEach((product) => {
    const price = product.quantity * product.price;
    total = price + total;
  });

  const result = await validateOrder(createOrderRequest, request.headers.authorization);
  console.log(result, 'result');
  if ( result.status === true) {
    const order = await Order.create({
      buyer_id: createOrderRequest.buyerId,
      address: createOrderRequest.address,
      status: 'NEW',
      total: total,
      products: createOrderRequest.products
    }, {
      include: [OrderItem]
    });
    await updateInventory(result.items, request.headers.authorization);
    response.status(201).send({
      order
    });
  } else {
    response.status(400).send({
      message: result.message
    });
  }





});


export const OrderRouter: Router = router;
