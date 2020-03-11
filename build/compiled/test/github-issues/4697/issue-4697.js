"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
describe("github issues > #4697 Revert migrations running in reverse order.", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        migrations: [__dirname + "/migration/*.js"],
                        enabledDrivers: ["mongodb"],
                        schemaCreate: true,
                        dropSchema: true,
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should revert migrations in the right order", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, lastMigration;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, connection.runMigrations()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, connection.undoLastMigration()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, connection.runMigrations()];
                case 3:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), lastMigration = _a[0];
                    lastMigration.should.have.property("timestamp", 1567689639607);
                    lastMigration.should.have.property("name", "MergeConfigs1567689639607");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-4697.js.map