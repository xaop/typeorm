"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var Post_1 = require("./entity/Post");
var chai_1 = require("chai");
var Category_1 = require("./entity/Category");
var OracleDriver_1 = require("../../../src/driver/oracle/OracleDriver");
describe("github issues > #3363 Isolation Level in transaction() from Connection", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        subscribers: [__dirname + "/subscriber/*{.js,.ts}"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should execute operations in READ UNCOMMITED isolation level", function () { return Promise.all(connections.map(function (connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var postId, categoryId, post, category;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Oracle doesn't support that transaction isolation level.
                        if (connection.driver instanceof OracleDriver_1.OracleDriver) {
                            return [2 /*return*/];
                        }
                        postId = undefined, categoryId = undefined;
                        return [4 /*yield*/, connection.transaction("READ UNCOMMITTED", function (transaction) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var post, category;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            post = new Post_1.Post();
                                            post.title = "Post #1";
                                            return [4 /*yield*/, transaction.save(post)];
                                        case 1:
                                            _a.sent();
                                            category = new Category_1.Category();
                                            category.name = "Category #1";
                                            return [4 /*yield*/, transaction.save(category)];
                                        case 2:
                                            _a.sent();
                                            postId = post.id;
                                            categoryId = category.id;
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "Post #1" } })];
                    case 2:
                        post = _a.sent();
                        chai_1.expect(post).not.to.be.undefined;
                        post.should.be.eql({
                            id: postId,
                            title: "Post #1"
                        });
                        return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "Category #1" } })];
                    case 3:
                        category = _a.sent();
                        chai_1.expect(category).not.to.be.undefined;
                        category.should.be.eql({
                            id: categoryId,
                            name: "Category #1"
                        });
                        return [2 /*return*/];
                }
            });
        });
    })); });
    it("should execute operations in SERIALIZABLE isolation level", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var postId, categoryId, post, category;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postId = undefined, categoryId = undefined;
                    return [4 /*yield*/, connection.transaction("SERIALIZABLE", function (entityManager) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var post, category;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        post = new Post_1.Post();
                                        post.title = "Post #1";
                                        return [4 /*yield*/, entityManager.save(post)];
                                    case 1:
                                        _a.sent();
                                        category = new Category_1.Category();
                                        category.name = "Category #1";
                                        return [4 /*yield*/, entityManager.save(category)];
                                    case 2:
                                        _a.sent();
                                        postId = post.id;
                                        categoryId = category.id;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.findOne(Post_1.Post, { where: { title: "Post #1" } })];
                case 2:
                    post = _a.sent();
                    chai_1.expect(post).not.to.be.undefined;
                    post.should.be.eql({
                        id: postId,
                        title: "Post #1"
                    });
                    return [4 /*yield*/, connection.manager.findOne(Category_1.Category, { where: { name: "Category #1" } })];
                case 3:
                    category = _a.sent();
                    chai_1.expect(category).not.to.be.undefined;
                    category.should.be.eql({
                        id: categoryId,
                        name: "Category #1"
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-3363.js.map