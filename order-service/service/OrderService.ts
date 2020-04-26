import {CreateOrderRequest} from '../src/controllers/v0/order/request/CreateOrderRequest';
import {getProductDetails} from './ProductService';
import {ProductItem} from '../response/ProductItem';


export async function validateOrder(createOrderRequest: CreateOrderRequest, authHeader: string) {
    // get product details from product service
    const validProducts = [];
    for ( const product of createOrderRequest.products) {
        const productDetails = await getProductDetails(product.product_id, authHeader) as ProductItem;
        // check quantity of product
        console.log(productDetails, 'product details', product.quantity, 'quantity');
        if ( productDetails.quantity < product.quantity) {
            return {
                status: false,
                message: 'Not available quantity of Product ' + product.product_id
            };
        }
        productDetails.quantity = productDetails.quantity - product.quantity;
        console.log('updated quantity', productDetails.quantity);
        validProducts.push(productDetails);
    }
    console.log(validProducts);
    return {
        status: true,
        items: validProducts
    };
}
