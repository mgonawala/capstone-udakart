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
let ProductItem = class ProductItem extends sequelize_typescript_1.Model {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductItem.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductItem.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductItem.prototype, "quantity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductItem.prototype, "unitPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductItem.prototype, "imageUrl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], ProductItem.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], ProductItem.prototype, "updatedAt", void 0);
ProductItem = __decorate([
    sequelize_typescript_1.Table
], ProductItem);
exports.ProductItem = ProductItem;
//# sourceMappingURL=ProductItem.js.map