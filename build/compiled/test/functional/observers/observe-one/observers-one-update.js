"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
describe("observers > one > on update", function () {
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
    it("should dispatch event with new value when entity is updated", function (ok) {
        if (!connections.length)
            ok();
        connections.filter(function (connection, index) { return index === 0; }).map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var time, post3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = 0;
                        /*const post1 = */ return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #1"))];
                    case 1:
                        /*const post1 = */ _a.sent();
                        /*const post2 = */ return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #2"))];
                    case 2:
                        /*const post2 = */ _a.sent();
                        return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #3"))];
                    case 3:
                        post3 = _a.sent();
                        /*const post4 = */ return [4 /*yield*/, connection.manager.save(new Post_1.Post("Hello #4"))];
                    case 4:
                        /*const post4 = */ _a.sent();
                        connection.manager.observeOne(Post_1.Post, { where: { id: 3, active: true } }).subscribe(function (entity) {
                            time++;
                            if (time === 1) {
                                entity.should.be.eql({ id: 3, title: "Hello #3", active: true });
                                post3.title = "Updated Post #3";
                                connection.manager.save(post3);
                            }
                            else if (time === 2) {
                                entity.should.be.eql({ id: 3, title: "Updated Post #3", active: true });
                                post3.active = false;
                                connection.manager.save(post3);
                            }
                            else if (time === 3) {
                                chai_1.expect(entity).to.be.undefined;
                                connection.manager.update(Post_1.Post, { id: 3, active: false }, { active: true });
                            }
                            else if (time === 4) {
                                entity.should.be.eql({ id: 3, title: "Updated Post #3", active: true });
                                ok();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=observers-one-update.js.map