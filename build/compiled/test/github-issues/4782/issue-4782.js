"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var chai_1 = require("chai");
var VersionUtils_1 = require("../../../src/util/VersionUtils");
describe("github issues > 4782 mariadb driver wants to recreate create/update date columns CURRENT_TIMESTAMP(6) === current_timestamp(6)", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        // logging: true,
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["mysql", "mariadb"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should not want to execute migrations twice", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var sql1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.driver.createSchemaBuilder().log()];
                case 1:
                    sql1 = _a.sent();
                    chai_1.expect(sql1.upQueries).to.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    describe("VersionUtils", function () {
        describe("isGreaterOrEqual", function () {
            it("should return false when comparing invalid versions", function () {
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("", "")).to.equal(false);
            });
            it("should return false when targetVersion is larger", function () {
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.2.4")).to.equal(false);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.4.3")).to.equal(false);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "2.2.3")).to.equal(false);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2", "1.3")).to.equal(false);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1", "2")).to.equal(false);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual(undefined, "0.0.1")).to.equal(false);
            });
            it("should return true when targetVersion is smaller", function () {
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.2.2")).to.equal(true);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.1.3")).to.equal(true);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "0.2.3")).to.equal(true);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2", "1.2")).to.equal(true);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("1", "1")).to.equal(true);
            });
            it("should work with mariadb-style versions", function () {
                var dbVersion = "10.4.8-MariaDB-1:10.4.8+maria~bionic";
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("10.4.9", dbVersion)).to.equal(true);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("10.4.8", dbVersion)).to.equal(true);
                chai_1.expect(VersionUtils_1.VersionUtils.isGreaterOrEqual("10.4.7", dbVersion)).to.equal(false);
            });
        });
    });
});
//# sourceMappingURL=issue-4782.js.map