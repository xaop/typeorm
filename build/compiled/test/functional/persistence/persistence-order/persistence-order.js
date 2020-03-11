"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
require("reflect-metadata");
var Connection_1 = require("../../../../src/connection/Connection");
var test_utils_1 = require("../../../utils/test-utils");
var Category_1 = require("./entity/Category");
var Post_1 = require("./entity/Post");
describe("persistence > order of persistence execution operations", function () {
    describe("should throw exception when non-resolvable circular relations found", function () {
        it("should throw CircularRelationsError", function () {
            chai_1.expect(function () {
                new Connection_1.Connection({
                    type: "mysql",
                    host: "localhost",
                    username: "test",
                    password: "test",
                    database: "test",
                    entities: [__dirname + "/entity/*{.js,.ts}"]
                });
            }).to.throw(Error);
        });
    });
    describe.skip("should persist all entities in correct order", function () {
        var _this = this;
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
        it("", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var category1, post1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category1 = new Category_1.Category();
                        category1.name = "Category saved by cascades #1";
                        post1 = new Post_1.Post();
                        post1.title = "Hello Post #1";
                        post1.category = category1;
                        return [4 /*yield*/, connection.manager.save(post1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=persistence-order.js.map