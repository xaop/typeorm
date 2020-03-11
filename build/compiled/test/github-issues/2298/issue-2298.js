"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var src_1 = require("../../../src");
var test_utils_1 = require("../../utils/test-utils");
var Product_1 = require("./entity/Product");
var Ticket_1 = require("./entity/Ticket");
var TicketProduct_1 = require("./entity/TicketProduct");
describe("github issues > #2298 - Repository filtering not considering related columns as filter", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should work perfectly", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var product1, product2, ticket1, ticket2, ticketProduct1, ticketProduct2, ticketProduct3, ticketProduct4, loadedTicket;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product1 = new Product_1.Product();
                    return [4 /*yield*/, connection.manager.save(product1)];
                case 1:
                    _a.sent();
                    product2 = new Product_1.Product();
                    return [4 /*yield*/, connection.manager.save(product2)];
                case 2:
                    _a.sent();
                    ticket1 = new Ticket_1.Ticket();
                    ticket1.shopId = "myshopId1";
                    ticket1.chainId = "myChainId1";
                    return [4 /*yield*/, connection.manager.save(ticket1)];
                case 3:
                    _a.sent();
                    ticket2 = new Ticket_1.Ticket();
                    ticket2.shopId = "myshopId1";
                    ticket2.chainId = "myChainId2";
                    return [4 /*yield*/, connection.manager.save(ticket2)];
                case 4:
                    _a.sent();
                    ticketProduct1 = new TicketProduct_1.TicketProduct();
                    ticketProduct1.product = product1;
                    ticketProduct1.ticket = ticket1;
                    return [4 /*yield*/, connection.manager.save(ticketProduct1)];
                case 5:
                    _a.sent();
                    ticketProduct2 = new TicketProduct_1.TicketProduct();
                    ticketProduct2.product = product1;
                    ticketProduct2.ticket = ticket1;
                    return [4 /*yield*/, connection.manager.save(ticketProduct2)];
                case 6:
                    _a.sent();
                    ticketProduct3 = new TicketProduct_1.TicketProduct();
                    ticketProduct3.product = product2;
                    ticketProduct3.ticket = ticket2;
                    return [4 /*yield*/, connection.manager.save(ticketProduct3)];
                case 7:
                    _a.sent();
                    ticketProduct4 = new TicketProduct_1.TicketProduct();
                    ticketProduct4.product = product2;
                    ticketProduct4.ticket = ticket2;
                    return [4 /*yield*/, connection.manager.save(ticketProduct4)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.find(Ticket_1.Ticket, {
                            where: {
                                shopId: "myshopId1",
                                chainId: src_1.In(["myChainId1", "myChainId2"]),
                                ticketItems: {
                                    product: {
                                        id: src_1.In([2, 3]),
                                    }
                                }
                            },
                            relations: {
                                ticketItems: {
                                    product: true
                                }
                            }
                        })];
                case 9:
                    loadedTicket = _a.sent();
                    loadedTicket.should.be.eql([{
                            id: 2,
                            shopId: "myshopId1",
                            chainId: "myChainId2",
                            ticketItems: [
                                {
                                    id: 3,
                                    product: {
                                        id: 2
                                    }
                                },
                                {
                                    id: 4,
                                    product: {
                                        id: 2
                                    }
                                }
                            ]
                        }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-2298.js.map