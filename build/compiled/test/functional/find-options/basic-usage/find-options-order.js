"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var src_1 = require("../../../../src");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var find_options_test_utils_1 = require("./find-options-test-utils");
var chai_1 = require("chai");
describe("find options > order", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({ __dirname: __dirname })];
            case 1: return [2 /*return*/, connections = _a.sent()];
        }
    }); }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("order by id DESC", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2, posts3, posts4, posts5, posts6, posts7, posts8;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: 1
                            }
                        }).getMany()];
                case 4:
                    posts3 = _a.sent();
                    posts3.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: {
                                    direction: "asc"
                                }
                            }
                        }).getMany()];
                case 5:
                    posts4 = _a.sent();
                    posts4.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: "DESC"
                            }
                        }).getMany()];
                case 6:
                    posts5 = _a.sent();
                    posts5.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: "desc"
                            }
                        }).getMany()];
                case 7:
                    posts6 = _a.sent();
                    posts6.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: -1
                            }
                        }).getMany()];
                case 8:
                    posts7 = _a.sent();
                    posts7.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                id: {
                                    direction: "DESC"
                                }
                            }
                        }).getMany()];
                case 9:
                    posts8 = _a.sent();
                    posts8.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by title", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                title: "desc"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where two criteria", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                title: "desc",
                                text: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by relation", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                author: {
                                    id: "desc"
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by relation with where relation applied", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    id: 1
                                }
                            },
                            order: {
                                author: {
                                    id: "desc"
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by nested relations", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                text: src_1.Not("About post #1")
                            },
                            order: {
                                author: {
                                    photos: {
                                        filename: "asc",
                                    }
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    // exact row order depends of settings like NULLS FIRST and NULLS LAST
                    posts.should.have.deep.members([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by complex nested relations", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                author: {
                                    photos: {
                                        filename: "desc"
                                    }
                                },
                                tags: {
                                    name: "asc"
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    // exact row order depends of settings like NULLS FIRST and NULLS LAST
                    posts.should.have.deep.members([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } }
                    ]);
                    chai_1.expect(posts[0].id).to.be.oneOf([1, 3]);
                    chai_1.expect(posts[1].id).to.be.oneOf([2, 1]);
                    chai_1.expect(posts[2].id).to.be.oneOf([3, 2]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by column in embed", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            order: {
                                counters: {
                                    likes: "desc"
                                },
                                id: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("order by relation in embed", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                text: src_1.Not("About post #2")
                            },
                            order: {
                                counters: {
                                    likedUsers: {
                                        firstName: "asc"
                                    }
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=find-options-order.js.map