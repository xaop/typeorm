"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var TicketProduct_1 = require("./TicketProduct");
var Product = /** @class */ (function () {
    function Product() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.OneToMany(function (type) { return TicketProduct_1.TicketProduct; }, function (ticketp) { return ticketp.product; }),
        tslib_1.__metadata("design:type", Array)
    ], Product.prototype, "ticketProduct", void 0);
    Product = tslib_1.__decorate([
        src_1.Entity()
    ], Product);
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map