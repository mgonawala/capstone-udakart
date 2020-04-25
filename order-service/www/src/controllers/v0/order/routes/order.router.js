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
const express_1 = require("express");
const OrderAccess_1 = require("../dataLayer/OrderAccess");
const Order_1 = require("../models/Order");
const OrderItem_1 = require("../models/OrderItem");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../../../config/config");
const OrderService_1 = require("../../../../../service/OrderService");
const ProductService_1 = require("../../../../../service/ProductService");
const c = config_1.config.dev;
const router = express_1.Router();
const orderAccess = new OrderAccess_1.OrderAccess();
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO change url to backend-user in environment file
        // http://backend-user:8080/api/v0/users/auth/verification
        console.log(`http://${process.env.USERS_SERVICE}/api/v0/users/auth/verification`);
        console.log(req.headers.authorization);
        try {
            const result = yield axios_1.default({
                method: 'get',
                url: `http://${process.env.USERS_SERVICE}/api/v0/users/auth/verification`,
                headers: {
                    'Authorization': `${req.headers.authorization}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                validateStatus: (status) => {
                    return status < 600;
                }
            });
            if (result.status !== 200) {
                return res.status(result.status).send(result.data.message);
            }
            return next();
        }
        catch (e) {
            console.log('error:', e);
            return res.status(500).send({ message: e.message });
        }
        /*
            await Axios.get(`http://${c.users_api_host}/api/v0/users/auth/verification`, {
              headers: {
                'Authorization': req.headers.authorization
              },
              validateStatus: status1 => {
                return status1 < 600;
              }
            }).then(response => {
              console.log('data:', response.status);
              if ( response.status !== 200) {
                return res.status(response.status).send(response.data.message);
              }
              return next();
            })
          .catch(error => {
            console.log('error:' + error);
            return res.status(500).send({message: error.message});
          });*/
    });
}
exports.requireAuth = requireAuth;
// get all orders
router.get('/', requireAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
    console.log('Get all prders.');
    const items = yield orderAccess.getAllOrders();
    response.status(200).send({
        items: items
    });
}));
// Retrieve all orders of a buyer
router.get('/:id', requireAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { id } = request.params;
    console.log('Id:', id);
    const item = yield orderAccess.getAllOrdersByBuyerId(id);
    if (item) {
        response.status(200).send(item);
    }
    else {
        response.status(404).send({
            message: 'Product with given Id not found.'
        });
    }
}));
// Create a new Order Item
router.post('/', requireAuth, (request, response) => __awaiter(this, void 0, void 0, function* () {
    const createOrderRequest = request.body;
    console.log(JSON.stringify(createOrderRequest), 'create order request');
    // Validate Request parameters
    if (!createOrderRequest.buyerId) {
        return response.status(400).send({
            message: 'Buyer ID is a required field'
        });
    }
    if (!createOrderRequest.address) {
        return response.status(400).send({
            message: 'Address is a required field'
        });
    }
    if (!createOrderRequest.products) {
        return response.status(400).send({
            message: 'Please provide product details'
        });
    }
    let total = 0;
    createOrderRequest.products.forEach((product) => {
        const price = product.quantity * product.price;
        total = price + total;
    });
    const result = yield OrderService_1.validateOrder(createOrderRequest);
    console.log(result, 'result');
    if (result.status === true) {
        const order = yield Order_1.Order.create({
            buyer_id: createOrderRequest.buyerId,
            address: createOrderRequest.address,
            status: 'NEW',
            total: total,
            products: createOrderRequest.products
        }, {
            include: [OrderItem_1.OrderItem]
        });
        yield ProductService_1.updateInventory(result.items);
        response.status(201).send({
            order
        });
    }
    else {
        response.status(400).send({
            message: result.message
        });
    }
}));
exports.OrderRouter = router;
//# sourceMappingURL=order.router.js.map