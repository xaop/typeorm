"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var TicketProduct_1 = require("./TicketProduct");
var Ticket = /** @class */ (function () {
    function Ticket() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Ticket.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Ticket.prototype, "shopId", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Ticket.prototype, "chainId", void 0);
    tslib_1.__decorate([
        src_1.OneToMany(function (type) { return TicketProduct_1.TicketProduct; }, function (ticketProduct) { return ticketProduct.ticket; }),
        tslib_1.__metadata("design:type", Array)
    ], Ticket.prototype, "ticketItems", void 0);
    Ticket = tslib_1.__decorate([
        src_1.Entity()
    ], Ticket);
    return Ticket;
}());
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map