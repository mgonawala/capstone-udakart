import Axios from 'axios';
import {OrderItem} from '../src/controllers/v0/order/models/OrderItem';
import {ProductItem} from '../response/ProductItem';

const PRODUCTS_API = process.env.PRODUCTS_SERVICE;

export async function updateInventory(orderItems: ProductItem[], authHeader: string) {
    for ( const orderItem of orderItems) {
        try {
            let product: ProductItem;
            const result = await   Axios({
                method: 'patch',
                data: {
                    quantity: orderItem.quantity
                },
                url: 'http://' + PRODUCTS_API + '/api/v0/products/' + orderItem.product_id,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

}

export  async function getProductDetails( id: string, authHeader: string): Promise<ProductItem> {
    console.log('get Productdetails', PRODUCTS_API)
    try {
        let product: ProductItem;
        const result = await   Axios({
            method: 'get',
            url: 'http://' + PRODUCTS_API + '/api/v0/products/' + id,
            headers: {
                'Accept': 'application/json',
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });
        if ( result.data !== undefined) {
            const id = result.data.id;
            const quantity = result.data.quantity;
            const unitPrice = result.data.unitPrice;
            product = {
                product_id: id,
                quantity: quantity,
                price: unitPrice
            };
         return product;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }

}

export async function getProductsInList( idList: number[]): Promise<ProductItem[]> {

    const idString = idList.reduce((str: string, n: number) => {
        return str.concat(n.toString()).concat(',');
    }, '');
    await Axios({
        method: 'get',
        url: 'http://' + PRODUCTS_API + '/api/v0/products?idList=' + idString,
        headers: {
            'Accept': 'application/json'
        }
    }).then((result) => {
        console.log(result.data);
       // return result.data as ProductItem[]
    }).catch(error => {
        console.log('error occurred', error);
        return [];
    });

    return ;
}
