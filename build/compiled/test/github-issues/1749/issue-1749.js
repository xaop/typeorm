"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var Bar_1 = require("./entity/Bar");
describe("github issues > #1749 Can't delete tables in non-default schema", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["postgres"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should delete entites from tables in different schemas", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var bar, persistedBar;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bar = new Bar_1.Bar();
                    return [4 /*yield*/, connection.manager.save(bar)];
                case 1:
                    persistedBar = _a.sent();
                    return [4 /*yield*/, connection.manager.delete(Bar_1.Bar, persistedBar.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1749.js.map