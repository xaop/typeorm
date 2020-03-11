"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var src_1 = require("../../../../src");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
describe("observers > many > on remove", function () {
    var _this = this;
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"]
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should dispatch event with new value when entity is removed", function (ok) {
        if (!connections.length)
            ok();
        connections.filter(function (connection, index) { return index === 0; }).map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var time, lastEntities, post2, post4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = 0;
                        /*const post1 = */ return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #1"))];
                    case 1:
                        /*const post1 = */ _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #2"))];
                    case 2:
                        post2 = _a.sent();
                        /*const post3 = */ return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #3"))];
                    case 3:
                        /*const post3 = */ _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #4"))];
                    case 4:
                        post4 = _a.sent();
                        connection.manager.observe(Post_1.Post, { where: { id: src_1.LessThan(4) } }).subscribe(function (entities) {
                            lastEntities = entities;
                            time++;
                            if (time === 1) {
                                entities.should.be.eql([
                                    { id: 1, title: "Hello #1", active: true },
                                    { id: 2, title: "Hello #2", active: true },
                                    { id: 3, title: "Hello #3", active: true },
                                ]);
                                connection.manager.remove(post2);
                            }
                            else if (time === 2) {
                                entities.should.be.eql([
                                    { id: 1, title: "Hello #1", active: true },
                                    { id: 3, title: "Hello #3", active: true },
                                ]);
                                connection.manager.delete(Post_1.Post, {
                                    title: "Hello #1"
                                });
                            }
                            else if (time === 3) {
                                entities.should.be.eql([
                                    { id: 3, title: "Hello #3", active: true },
                                ]);
                                Promise.all([
                                    connection.manager.save(new Post_1.Post("Hello #5")),
                                    connection.manager.remove(post4),
                                ]).then(function () {
                                    time.should.be.equal(3);
                                    lastEntities.should.be.eql([
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
//# sourceMappingURL=observers-many-remove.js.map