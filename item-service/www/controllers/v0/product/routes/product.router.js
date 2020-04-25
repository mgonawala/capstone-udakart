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
const ProductItem_1 = require("../models/ProductItem");
const aws_1 = require("../../../../aws");
const router = express_1.Router();
// Retrieve list of all items in the Catalogue
router.get('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const items = yield ProductItem_1.ProductItem.findAndCountAll();
    const products = items.rows.map(product => {
        product.imageUrl = aws_1.getGetSignedUrl(product.id + '.jpg');
        return product;
    });
    response.status(200).send({
        items: products
    });
}));
// Retrieve a Product Item by Id
router.get('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { id } = request.params;
    console.log('Id:', id);
    const item = yield ProductItem_1.ProductItem.findByPk(id);
    if (item !== undefined) {
        item.imageUrl = aws_1.getGetSignedUrl(item.id + '.jpg');
        response.status(200).send(item);
    }
    else {
        response.status(404).send({
            message: 'Product with given Id not found.'
        });
    }
}));
// Delete a product item by ID
router.delete('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { id } = request.params;
    const item = yield ProductItem_1.ProductItem.findByPk(id);
    if (!item) {
        response.status(404).send({
            message: 'Product with given Item does not found.'
        });
    }
    yield item.destroy();
    response.status(204).send('');
}));
// Update a Product Item by Id
router.patch('/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { id } = request.params;
    console.log('Id:', id);
    const item = yield ProductItem_1.ProductItem.findByPk(id);
    if (!item) {
        response.status(404).send({
            message: 'Product with given Id not found.'
        });
    }
    const name = request.body.name;
    const category = request.body.category;
    const quantity = request.body.quantity;
    const unitPrice = request.body.unitPrice;
    console.log(quantity, 'quantity');
    if (name !== undefined) {
        item.name = name;
    }
    if (category !== undefined) {
        item.category = category;
    }
    if (quantity !== undefined) {
        item.quantity = quantity;
    }
    if (unitPrice !== undefined && !isNaN(parseInt(unitPrice))) {
        item.unitPrice = parseInt(unitPrice);
    }
    const saved_item = yield item.save();
    response.status(200).send({
        item: saved_item
    });
}));
// Create a new Product Item
router.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const name = request.body.name;
    const category = request.body.category;
    const quantity = request.body.quantity;
    const unitPrice = request.body.unitPrice;
    // Validate Request parameters
    if (!name) {
        return response.status(400).send({
            message: 'Name is a required field'
        });
    }
    if (!quantity) {
        return response.status(400).send({
            message: 'Quantity is a required field'
        });
    }
    if (parseInt(quantity) === NaN) {
        return response.status(400).send({
            message: 'Quantity should be a valid number.'
        });
    }
    if (!category) {
        return response.status(400).send({
            message: 'Category is a required field.'
        });
    }
    if (!unitPrice) {
        return response.status(400).send({
            message: 'Unit Price is a required field.'
        });
    }
    if (parseInt(unitPrice) === NaN) {
        return response.status(400).send({
            message: 'Unit Price should be a valid number.'
        });
    }
    const item = yield new ProductItem_1.ProductItem({
        name: name,
        category: category,
        quantity: quantity,
        unitPrice: unitPrice,
        imageUrl: null,
    });
    const saved_item = yield item.save();
    saved_item.imageUrl = null;
    response.status(201).send({
        item: saved_item
    });
}));
// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { fileName } = req.params;
    const url = aws_1.getPutSignedUrl(fileName);
    res.status(201).send({ url: url });
}));
exports.ProductRouter = router;
//# sourceMappingURL=product.router.js.map