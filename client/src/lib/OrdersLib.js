import Axios from 'axios';
import {OrderItem} from '../model/ModelItems';

const ORDERS_SERVICE= process.env.REACT_APP_ORDERS_SERVICE
const ORDERS_API = `http://${ORDERS_SERVICE}/api/v0/orders`;

export async function createOrder(cartItems, setCartItems, authToken) {

    let order = {
        buyerId: '123',
        address: 'Dummy',
        products: []
    };

    let product = OrderItem;
    order.products = cartItems.map( item => {
            product.product_id = item.id;
            product.price = item.unitPrice;
            product.quantity = item.quantity;
            return product;
        }
    );

    try{
        const result = await Axios({
            method: 'post',
            url: ORDERS_API,
            data: order,
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Beater ${authToken}`
            },
            validateStatus: (status)=> {
                return status <600
            }
        });

        if(result.status == 201){
            setCartItems([]);
            localStorage.removeItem('cartItems');
           return {
               message: 'Order Placed successfully'
           };
        }
        else{
            return {
                message: result.data.message
            };
        }
    }
    catch (e) {
        console.log('Error occurred:',e);
        return {
            message: e.message
        }
    }
}


