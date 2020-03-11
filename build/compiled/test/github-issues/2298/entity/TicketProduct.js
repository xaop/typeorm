"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var Product_1 = require("./Product");
var Ticket_1 = require("./Ticket");
var TicketProduct = /** @class */ (function () {
    function TicketProduct() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], TicketProduct.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.ManyToOne(function (type) { return Product_1.Product; }, function (product) { return product.ticketProduct; }),
        tslib_1.__metadata("design:type", Product_1.Product)
    ], TicketProduct.prototype, "product", void 0);
    tslib_1.__decorate([
        src_1.ManyToOne(function (type) { return Ticket_1.Ticket; }, function (ticket) { return ticket.ticketItems; }),
        tslib_1.__metadata("design:type", Ticket_1.Ticket)
    ], TicketProduct.prototype, "ticket", void 0);
    TicketProduct = tslib_1.__decorate([
        src_1.Entity()
    ], TicketProduct);
    return TicketProduct;
}());
exports.TicketProduct = TicketProduct;
//# sourceMappingURL=TicketProduct.js.map