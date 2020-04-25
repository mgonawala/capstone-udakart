"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const PRODUCTS_API = process.env.PRODUCTS_SERVICE;
function updateInventory(orderItems) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const orderItem of orderItems) {
            try {
                let product;
                const result = yield axios_1.default({
                    method: 'patch',
                    data: {
                        quantity: orderItem.quantity
                    },
                    url: 'http://' + PRODUCTS_API + '/api/v0/products/' + orderItem.product_id,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
exports.updateInventory = updateInventory;
function getProductDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('get Productdetails', PRODUCTS_API);
        try {
            let product;
            const result = yield axios_1.default({
                method: 'get',
                url: 'http://' + PRODUCTS_API + '/api/v0/products/' + id,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (result.data !== undefined) {
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
        }
        catch (err) {
            console.log(err);
            return undefined;
        }
    });
}
exports.getProductDetails = getProductDetails;
function getProductsInList(idList) {
    return __awaiter(this, void 0, void 0, function* () {
        const idString = idList.reduce((str, n) => {
            return str.concat(n.toString()).concat(',');
        }, '');
        yield axios_1.default({
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
        return;
    });
}
exports.getProductsInList = getProductsInList;
//# sourceMappingURL=ProductService.js.map