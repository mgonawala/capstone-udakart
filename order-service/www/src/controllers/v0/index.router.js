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
const express_1 = require("express");
const order_router_1 = require("./order/routes/order.router");
const router = express_1.Router();
router.use('/orders', order_router_1.OrderRouter);
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send(`from version v2`);
}));
router.get('/health', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).send(`OK`);
}));
router.get('/probe', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).send(`OK`);
}));
exports.IndexRouter = router;
//# sourceMappingURL=index.router.js.map