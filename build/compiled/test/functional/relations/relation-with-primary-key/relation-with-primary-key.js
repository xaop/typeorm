"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
describe("relations > relation with primary key", function () {
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
    describe("many-to-one with primary key in relation", function () {
        var _this = this;
        it("should work perfectly", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var category1, post1, category2, post2, posts;
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
                        category2 = new Category_1.Category();
                        category2.name = "Category saved by cascades #2";
                        post2 = new Post_1.Post();
                        post2.title = "Hello Post #2";
                        post2.category = category2;
                        return [4 /*yield*/, connection.manager.save(post2)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.find(Post_1.Post, {
                                relations: ["category"],
                                order: {
                                    category: {
                                        id: "ASC"
                                    }
                                }
                            })];
                    case 3:
                        posts = _a.sent();
                        posts.should.be.eql([{
                                title: "Hello Post #1",
                                categoryId: 1,
                                category: {
                                    id: 1,
                                    name: "Category saved by cascades #1"
                                }
                            }, {
                                title: "Hello Post #2",
                                categoryId: 2,
                                category: {
                                    id: 2,
                                    name: "Category saved by cascades #2"
                                }
                            }]);
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=relation-with-primary-key.js.map