"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var src_1 = require("../../../../src");
var Post_1 = require("./entity/Post");
var PostgresDriver_1 = require("../../../../src/driver/postgres/PostgresDriver");
var PersonAR_1 = require("./entity/PersonAR");
var chai_1 = require("chai");
describe("repository > find options > operators", function () {
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
    it("not", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not("About #1")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $not: "About #1" }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("lessThan", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.LessThan(10)
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$lessThan", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $lessThan: 10 }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("lessThanOrEqual", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, post3, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "About #3";
                    post3.likes = 13;
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.LessThanOrEqual(12)
                        })];
                case 4:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([
                        { id: 1, likes: 12, title: "About #1" },
                        { id: 2, likes: 3, title: "About #2" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(lessThan)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.LessThan(10))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not($lessThan)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $not: { $lessThan: 10 } }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(lessThanOrEqual)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, post3, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "About #3";
                    post3.likes = 13;
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.LessThanOrEqual(12))
                        })];
                case 4:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 3, likes: 13, title: "About #3" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("moreThan", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.MoreThan(10)
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("moreThanOrEqual", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, post3, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "About #3";
                    post3.likes = 13;
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.MoreThanOrEqual(12)
                        })];
                case 4:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([
                        { id: 1, likes: 12, title: "About #1" },
                        { id: 3, likes: 13, title: "About #3" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$moreThan", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $moreThan: 10 }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(moreThan)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.MoreThan(10))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not($moreThan)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $not: { $moreThan: 10 } }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(moreThanOrEqual)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, post3, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "About #3";
                    post3.likes = 13;
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.MoreThanOrEqual(12))
                        })];
                case 4:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(moreThanOrEqual)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, post3, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "About #3";
                    post3.likes = 13;
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.MoreThanOrEqual(12))
                        })];
                case 4:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("equal", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Equal("About #2")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$equal", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $equal: "About #2" }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(equal)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.Equal("About #2"))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(equal)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $not: { $equal: "About #2" } }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("like", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Like("%out #%")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }, { id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("like", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $like: "%out #%" }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }, { id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(like)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.Like("%out #1"))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not($like)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $not: { $like: "%out #1" } }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("between", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts1, loadedPosts2, loadedPosts3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Between(1, 10)
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Between(10, 13)
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Between(1, 20)
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([{ id: 1, likes: 12, title: "About #1" }, { id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$between", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts1, loadedPosts2, loadedPosts3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $between: [1, 10] }
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $between: [10, 13] }
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $between: [1, 20] }
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([{ id: 1, likes: 12, title: "About #1" }, { id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(between)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts1, loadedPosts2, loadedPosts3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.Between(1, 10))
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.Between(10, 13))
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Not(src_1.Between(1, 20))
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not($between)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts1, loadedPosts2, loadedPosts3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $not: { $between: [1, 10] } }
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $not: { $between: [10, 13] } }
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $not: { $between: [1, 20] } }
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("in", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.In(["About #2", "About #3"])
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$in", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $in: ["About #2", "About #3"] }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(in)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.In(["About #1", "About #3"]))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not($in)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $not: { $in: ["About #1", "About #3"] } }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("any", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver))
                        return [2 /*return*/];
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Any(["About #2", "About #3"])
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$any", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver))
                        return [2 /*return*/];
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $any: ["About #2", "About #3"] }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(any)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver))
                        return [2 /*return*/];
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.Any(["About #2", "About #3"]))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$not($any)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connection.driver instanceof PostgresDriver_1.PostgresDriver))
                        return [2 /*return*/];
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: { $not: { $any: ["About #2", "About #3"] } }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("isNull", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = null;
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.IsNull()
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: null }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("not(isNull)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = null;
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.Not(src_1.IsNull())
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("raw", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Raw("12")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("$raw", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: { $raw: "12" }
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("raw (function)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Raw(function (columnAlias) { return "1 + " + columnAlias + " = 4"; })
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("if (true)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.If(10 === (5 + 5), "About #1")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("if (false)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.If(9 === (5 + 5), "About #1")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.length.should.be.eql(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("if (else)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.If(9 === (5 + 5), "About #1", "About #2")
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("if (operator)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            title: src_1.If(10 === (5 + 5), src_1.Like("About #%"))
                        })];
                case 3:
                    loadedPosts = _a.sent();
                    loadedPosts.length.should.be.eql(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("switch", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, value1, loadedPosts1, value2, loadedPosts2, value3, loadedPosts3, value4, loadedPosts4, value5, loadedPosts5, value6, loadedPosts6;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    value1 = "two";
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Switch(value1, {
                                "one": 1,
                                "two": 2,
                                "three": 3,
                                "four": 4,
                                "five": 5,
                                "move than five": src_1.MoreThan(5),
                                "less that five": src_1.Not(src_1.MoreThan(5)),
                            })
                        })];
                case 3:
                    loadedPosts1 = _a.sent();
                    loadedPosts1.length.should.be.equal(0);
                    value2 = "three";
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Switch(value2, {
                                "one": 1,
                                "two": 2,
                                "three": 3,
                                "four": 4,
                                "five": 5,
                                "move than five": src_1.MoreThan(5),
                                "less that five": src_1.Not(src_1.MoreThan(5)),
                            })
                        })];
                case 4:
                    loadedPosts2 = _a.sent();
                    loadedPosts2.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    value3 = "move than five";
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Switch(value3, {
                                "one": 1,
                                "two": 2,
                                "three": 3,
                                "four": 4,
                                "five": 5,
                                "move than five": src_1.MoreThan(5),
                                "less that five": src_1.Not(src_1.MoreThan(5)),
                            })
                        })];
                case 5:
                    loadedPosts3 = _a.sent();
                    loadedPosts3.should.be.eql([{ id: 1, likes: 12, title: "About #1" }]);
                    value4 = "less that five";
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Switch(value4, {
                                "one": 1,
                                "two": 2,
                                "three": 3,
                                "four": 4,
                                "five": 5,
                                "move than five": src_1.MoreThan(5),
                                "less that five": src_1.Not(src_1.MoreThan(5)),
                            })
                        })];
                case 6:
                    loadedPosts4 = _a.sent();
                    loadedPosts4.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    value5 = "something else";
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Switch(value5, {
                                "one": 1,
                                "two": 2,
                                "three": 3,
                                "four": 4,
                                "five": 5,
                                "move than five": src_1.MoreThan(5),
                                "less that five": src_1.Not(src_1.MoreThan(5)),
                                "_": 3
                            })
                        })];
                case 7:
                    loadedPosts5 = _a.sent();
                    loadedPosts5.should.be.eql([{ id: 2, likes: 3, title: "About #2" }]);
                    value6 = "something else";
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find({
                            likes: src_1.Switch(value6, {
                                "one": 1,
                                "two": 2,
                                "three": 3,
                                "four": 4,
                                "five": 5,
                                "move than five": src_1.MoreThan(5),
                                "less that five": src_1.Not(src_1.MoreThan(5))
                            })
                        })];
                case 8:
                    loadedPosts6 = _a.sent();
                    loadedPosts6.length.should.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("or (array syntax)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post1, post2, post3, loadedPosts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.title = "About #1";
                    post1.likes = 12;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 1:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "About #2";
                    post2.likes = 3;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 2:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "About #3";
                    post3.likes = 4;
                    return [4 /*yield*/, connection.manager.save(post3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getRepository(Post_1.Post).find([{
                                likes: 3
                            }, {
                                likes: 4
                            }])];
                case 4:
                    loadedPosts = _a.sent();
                    loadedPosts.should.be.eql([
                        { id: 2, likes: 3, title: "About #2" },
                        { id: 3, likes: 4, title: "About #3" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should work with ActiveRecord model", function () { return src_1.PromiseUtils.runInSequence(connections, function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var person, loadedPeople;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PersonAR_1.PersonAR.useConnection(connection);
                    person = new PersonAR_1.PersonAR();
                    person.name = "Timber";
                    return [4 /*yield*/, connection.manager.save(person)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, PersonAR_1.PersonAR.find({
                            name: src_1.In(["Timber"])
                        })];
                case 2:
                    loadedPeople = _a.sent();
                    chai_1.expect(loadedPeople[0].name).to.be.equal("Timber");
                    return [2 /*return*/];
            }
        });
    }); }); });
});
//# sourceMappingURL=repository-find-operators.js.map