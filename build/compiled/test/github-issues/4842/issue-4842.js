"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var chai_1 = require("chai");
var test_utils_1 = require("../../utils/test-utils");
var Post_1 = require("./entity/Post");
describe("github issues > #4842 QueryExpressionMap doesn't clone distinct property", function () {
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
    it("should contain correct distinct value after query builder is cloned", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var query, sqlWithDistinct;
        return tslib_1.__generator(this, function (_a) {
            query = connection.manager.createQueryBuilder(Post_1.Post, "post")
                .distinct()
                .disableEscaping();
            sqlWithDistinct = query.getSql();
            chai_1.expect(query.clone().getSql()).to.equal(sqlWithDistinct);
            return [2 /*return*/];
        });
    }); })); });
});
//# sourceMappingURL=issue-4842.js.map