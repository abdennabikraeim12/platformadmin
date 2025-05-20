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
exports.ProductFilterDto = exports.SortOrder = exports.ProductSortBy = void 0;
const class_validator_1 = require("class-validator");
var ProductSortBy;
(function (ProductSortBy) {
    ProductSortBy["NAME"] = "name";
    ProductSortBy["STOCK"] = "stock";
    ProductSortBy["CATEGORY"] = "category";
    ProductSortBy["CREATED_AT"] = "createdAt";
})(ProductSortBy || (exports.ProductSortBy = ProductSortBy = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class ProductFilterDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = ProductSortBy.CREATED_AT;
        this.order = SortOrder.DESC;
    }
}
exports.ProductFilterDto = ProductFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProductFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ProductFilterDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ProductSortBy),
    __metadata("design:type", String)
], ProductFilterDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder),
    __metadata("design:type", String)
], ProductFilterDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductFilterDto.prototype, "search", void 0);
//# sourceMappingURL=product-filter.dto.js.map