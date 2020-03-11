"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var Error_1 = require("./entity/Error");
describe("github issues > #1887 Having problems with UNIQUEIDENTIFIERS", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mssql"],
                        schemaCreate: true,
                        dropSchema: true,
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should correctly insert data", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var errorRepository, err;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorRepository = connection.getRepository(Error_1.Error);
                    err = new Error_1.Error();
                    err.errorDate = new Date();
                    err.errorDescription = "test insert error";
                    err.errorNumber = 505;
                    err.executionGuid = "82E66316-AC4C-4EE2-8F98-66694FA38261";
                    return [4 /*yield*/, errorRepository.insert(err)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-1887.js.map