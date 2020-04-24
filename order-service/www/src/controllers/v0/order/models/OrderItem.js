"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Order_1 = require("./Order");
let OrderItem = class OrderItem extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Order_1.Order),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], OrderItem.prototype, "order_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Order_1.Order),
    __metadata("design:type", Order_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], OrderItem.prototype, "product_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
OrderItem = __decorate([
    sequelize_typescript_1.Table
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map