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
const Order_1 = require("../models/Order");
class OrderAccess {
    constructor() {
    }
    getAllOrdersByBuyerId(buyerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield Order_1.Order.findAll({
                where: {
                    buyer_id: buyerId
                }
            });
            if (orders.length !== 0) {
                console.log('Found orders:', orders.length);
            }
            return orders;
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield Order_1.Order.findAll({ order: [['createdAt', 'DESC']] });
            if (orders.length !== 0) {
                console.log('Found orders:', orders.length);
            }
            return orders;
        });
    }
}
exports.OrderAccess = OrderAccess;
//# sourceMappingURL=OrderAccess.js.map