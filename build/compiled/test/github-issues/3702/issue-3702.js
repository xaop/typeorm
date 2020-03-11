"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var chai_1 = require("chai");
var LetterBox_1 = require("./entity/LetterBox");
// Another related path: test/functional/spatial
describe("github issues > #3702 MySQL Spatial Type Support : GeomFromText function is not supported", function () {
    describe("when legacySpatialSupport: true", function () {
        var connections;
        before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                            entities: [__dirname + "/entity/*{.js,.ts}"],
                            enabledDrivers: ["mysql"],
                            dropSchema: true,
                            schemaCreate: true,
                            driverSpecific: {},
                        })];
                    case 1: return [2 /*return*/, connections = _a.sent()];
                }
            });
        }); });
        after(function () { return test_utils_1.closeTestingConnections(connections); });
        it("should use GeomFromText", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var queryBuilder, sql;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = connection.createQueryBuilder().insert();
                        queryBuilder.into(LetterBox_1.LetterBox).values({ coord: "POINT(20 30)" });
                        sql = queryBuilder.getSql();
                        chai_1.expect(sql).includes("GeomFromText");
                        chai_1.expect(sql).not.includes("ST_GeomFromText");
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should provide SRID", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var queryBuilder, sql;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = connection.createQueryBuilder().insert();
                        queryBuilder.into(LetterBox_1.LetterBox).values({ coord: "POINT(25 100)" });
                        sql = queryBuilder.getSql();
                        chai_1.expect(sql).includes("4326");
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should use AsText", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var repository, queryBuilder, sql;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = connection.getRepository(LetterBox_1.LetterBox);
                        queryBuilder = repository.createQueryBuilder("letterBox").select(["letterBox"]);
                        sql = queryBuilder.getSql();
                        chai_1.expect(sql).includes("AsText");
                        chai_1.expect(sql).not.includes("ST_AsText");
                        return [4 /*yield*/, queryBuilder.getMany()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("when legacySpatialSupport: false", function () {
        var connections;
        before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                            entities: [__dirname + "/entity/*{.js,.ts}"],
                            enabledDrivers: ["mysql"],
                            dropSchema: true,
                            schemaCreate: true,
                            driverSpecific: {
                                legacySpatialSupport: false,
                            }
                        })];
                    case 1: return [2 /*return*/, connections = _a.sent()];
                }
            });
        }); });
        after(function () { return test_utils_1.closeTestingConnections(connections); });
        it("should use ST_GeomFromText", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var queryBuilder, sql;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = connection.createQueryBuilder().insert();
                        queryBuilder.into(LetterBox_1.LetterBox).values({ coord: "POINT(20 30)" });
                        sql = queryBuilder.getSql();
                        chai_1.expect(sql).includes("ST_GeomFromText");
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should provide SRID", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var queryBuilder, sql;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = connection.createQueryBuilder().insert();
                        queryBuilder.into(LetterBox_1.LetterBox).values({ coord: "POINT(25 100)" });
                        sql = queryBuilder.getSql();
                        chai_1.expect(sql).includes("4326");
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should use ST_AsText", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var repository, queryBuilder, sql;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = connection.getRepository(LetterBox_1.LetterBox);
                        queryBuilder = repository.createQueryBuilder("letterBox").select(["letterBox"]);
                        sql = queryBuilder.getSql();
                        chai_1.expect(sql).includes("ST_AsText");
                        return [4 /*yield*/, queryBuilder.getMany()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=issue-3702.js.map