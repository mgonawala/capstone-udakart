"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = require("./ProductService");
function validateOrder(createOrderRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        // get product details from product service
        const validProducts = [];
        for (const product of createOrderRequest.products) {
            const productDetails = yield ProductService_1.getProductDetails(product.product_id);
            // check quantity of product
            console.log(productDetails, 'product details', product.quantity, 'quantity');
            if (productDetails.quantity < product.quantity) {
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
    });
}
exports.validateOrder = validateOrder;
//# sourceMappingURL=OrderService.js.map