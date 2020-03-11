"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var src_1 = require("../../../../src");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
describe("observers > many and count > on insert", function () {
    var _this = this;
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should observe entities when new entity is inserted", function (ok) {
        if (!connections.length)
            ok();
        connections.filter(function (connection, index) { return index === 0; }).map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var time;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = 0;
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello Post"))];
                    case 1:
                        _a.sent();
                        connection.manager.observeManyAndCount(Post_1.Post).subscribe(function (_a) {
                            var _b = tslib_1.__read(_a, 2), entities = _b[0], count = _b[1];
                            time++;
                            if (time === 1) {
                                entities.should.be.eql([{ id: 1, title: "Hello Post", active: true }]);
                                count.should.be.eql(1);
                                connection.manager.save(new Post_1.Post("Second Post"));
                            }
                            else if (time === 2) {
                                entities.should.be.eql([
                                    { id: 1, title: "Hello Post", active: true },
                                    { id: 2, title: "Second Post", active: true },
                                ]);
                                count.should.be.eql(2);
                                connection.manager.save(new Post_1.Post("Third Post"));
                            }
                            else if (time === 3) {
                                entities.should.be.eql([
                                    { id: 1, title: "Hello Post", active: true },
                                    { id: 2, title: "Second Post", active: true },
                                    { id: 3, title: "Third Post", active: true },
                                ]);
                                count.should.be.eql(3);
                                ok();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it("should observe entities when new entity is inserted with conditional query", function (ok) {
        if (!connections.length)
            ok();
        connections.filter(function (connection, index) { return index === 0; }).map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var time, lastEntities;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = 0, lastEntities = [];
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #1"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #2"))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #3"))];
                    case 3:
                        _a.sent();
                        connection.manager
                            .observeManyAndCount(Post_1.Post, {
                            where: {
                                id: src_1.Between(3, 5)
                            }
                        }).subscribe(function (_a) {
                            var _b = tslib_1.__read(_a, 2), entities = _b[0], count = _b[1];
                            lastEntities = entities;
                            time++;
                            if (time === 1) {
                                entities.should.be.eql([{ id: 3, title: "Hello #3", active: true }]);
                                count.should.be.eql(1);
                                connection.manager.save(new Post_1.Post("Hello #4"));
                            }
                            else if (time === 2) {
                                entities.should.be.eql([
                                    { id: 3, title: "Hello #3", active: true },
                                    { id: 4, title: "Hello #4", active: true },
                                ]);
                                count.should.be.eql(2);
                                connection.manager.save(new Post_1.Post("Hello #5"));
                            }
                            else if (time === 3) {
                                entities.should.be.eql([
                                    { id: 3, title: "Hello #3", active: true },
                                    { id: 4, title: "Hello #4", active: true },
                                    { id: 5, title: "Hello #5", active: true },
                                ]);
                                count.should.be.eql(3);
                                connection.manager
                                    .save(new Post_1.Post("Hello #6"))
                                    .then(function () {
                                    time.should.be.equal(3);
                                    lastEntities.should.be.eql([
                                        { id: 3, title: "Hello #3", active: true },
                                        { id: 4, title: "Hello #4", active: true },
                                        { id: 5, title: "Hello #5", active: true },
                                    ]);
                                    setTimeout(ok, 50);
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it("should observe entities and preserve order when new entity is inserted with conditional query", function (ok) {
        if (!connections.length)
            ok();
        connections.filter(function (connection, index) { return index === 0; }).map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var time, lastEntities;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = 0, lastEntities = [];
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #1"))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #2"))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #3"))];
                    case 3:
                        _a.sent();
                        connection.manager
                            .observeManyAndCount(Post_1.Post, {
                            where: {
                                id: src_1.Between(3, 5)
                            },
                            order: {
                                title: "DESC"
                            }
                        }).subscribe(function (_a) {
                            var _b = tslib_1.__read(_a, 2), entities = _b[0], count = _b[1];
                            lastEntities = entities;
                            time++;
                            if (time === 1) {
                                entities.should.be.eql([{ id: 3, title: "Hello #3", active: true }]);
                                connection.manager.save(new Post_1.Post("Hello #4"));
                                count.should.be.eql(1);
                            }
                            else if (time === 2) {
                                entities.should.be.eql([
                                    { id: 4, title: "Hello #4", active: true },
                                    { id: 3, title: "Hello #3", active: true },
                                ]);
                                connection.manager.save(new Post_1.Post("Hello #5"));
                                count.should.be.eql(2);
                            }
                            else if (time === 3) {
                                entities.should.be.eql([
                                    { id: 5, title: "Hello #5", active: true },
                                    { id: 4, title: "Hello #4", active: true },
                                    { id: 3, title: "Hello #3", active: true },
                                ]);
                                count.should.be.eql(3);
                                connection.manager
                                    .save(new Post_1.Post("Hello #6"))
                                    .then(function () {
                                    time.should.be.equal(3);
                                    lastEntities.should.be.eql([
                                        { id: 5, title: "Hello #5", active: true },
                                        { id: 4, title: "Hello #4", active: true },
                                        { id: 3, title: "Hello #3", active: true },
                                    ]);
                                    setTimeout(ok, 50);
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=observers-many-and-count-insert.js.map