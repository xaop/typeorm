"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var src_1 = require("../../../../src");
var test_utils_1 = require("../../../utils/test-utils");
var Author_1 = require("./entity/Author");
var Counters_1 = require("./entity/Counters");
var Post_1 = require("./entity/Post");
var Tag_1 = require("./entity/Tag");
var find_options_test_utils_1 = require("./find-options-test-utils");
describe("find options > where", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({ __dirname: __dirname })];
            case 1: return [2 /*return*/, connections = _a.sent()];
        }
    }); }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("where id", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                id: 1
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([{ id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where title", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                title: "Post #2"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([{ id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } }]);
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
                            where: {
                                title: "Post #2",
                                text: "About post #2"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([{ id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } }]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where two criteria without match", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                title: "Post #2",
                                text: "About post #3"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where relation", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2;
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
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    id: 2
                                }
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where column and relation", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                title: "Post #2",
                                author: {
                                    id: 1
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where nested relations", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    photos: {
                                        filename: "chain.jpg",
                                        description: "Me and chain"
                                    }
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
    it("where complex nested relations", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    photos: {
                                        filename: "chain.jpg",
                                        description: "Me and chain"
                                    }
                                },
                                tags: {
                                    name: "category #1"
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where column in embed", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                counters: {
                                    likes: 1
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where relation in embed", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                counters: {
                                    likedUsers: {
                                        firstName: "Gyro"
                                    }
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where complex with or + and", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: [{
                                    title: "Post #2",
                                }, {
                                    counters: {
                                        likedUsers: [{
                                                firstName: "Gyro",
                                                lastName: "Copter"
                                            }, {
                                                firstName: "Timber",
                                                lastName: "Saw"
                                            }]
                                    }
                                }]
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where relations with operators", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2, posts3, authors, tags1, tags2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                tags: src_1.MoreThan(1),
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                tags: src_1.MoreThan(0),
                                counters: {
                                    likedUsers: src_1.MoreThan(1),
                                }
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    photos: src_1.MoreThan(1)
                                }
                            }
                        }).getMany()];
                case 4:
                    posts3 = _a.sent();
                    posts3.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Author_1.Author, "author").setFindOptions({
                            where: {
                                photos: src_1.MoreThan(0)
                            }
                        }).getMany()];
                case 5:
                    authors = _a.sent();
                    authors.should.be.eql([
                        { id: 1, firstName: "Timber", lastName: "Saw", age: 25 },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Tag_1.Tag, "tag").setFindOptions({
                            where: {
                                posts: src_1.MoreThan(1)
                            }
                        }).getMany()];
                case 6:
                    tags1 = _a.sent();
                    tags1.should.be.eql([
                        { id: 1, name: "category #1" },
                        { id: 2, name: "category #2" },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Tag_1.Tag, "tag").setFindOptions({
                            where: {
                                posts: src_1.LessThan(1)
                            }
                        }).getMany()];
                case 7:
                    tags2 = _a.sent();
                    tags2.should.be.eql([
                        { id: 3, name: "category #3" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("where relations with operators (alt)", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2, posts3, authors, tags1, tags2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                tags: { $moreThan: 1 },
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                tags: { $moreThan: 0 },
                                counters: {
                                    likedUsers: { $moreThan: 1 },
                                }
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    photos: { $moreThan: 1 }
                                }
                            }
                        }).getMany()];
                case 4:
                    posts3 = _a.sent();
                    posts3.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Author_1.Author, "author").setFindOptions({
                            where: {
                                photos: { $moreThan: 0 }
                            }
                        }).getMany()];
                case 5:
                    authors = _a.sent();
                    authors.should.be.eql([
                        { id: 1, firstName: "Timber", lastName: "Saw", age: 25 },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Tag_1.Tag, "tag").setFindOptions({
                            where: {
                                posts: { $moreThan: 1 }
                            }
                        }).getMany()];
                case 6:
                    tags1 = _a.sent();
                    tags1.should.be.eql([
                        { id: 1, name: "category #1" },
                        { id: 2, name: "category #2" },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Tag_1.Tag, "tag").setFindOptions({
                            where: {
                                posts: { $lessThan: 1 }
                            }
                        }).getMany()];
                case 7:
                    tags2 = _a.sent();
                    tags2.should.be.eql([
                        { id: 3, name: "category #3" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should not apply inner join if all conditions return undefined", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post4, posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    post4 = new Post_1.Post();
                    post4.title = "Post #4";
                    post4.text = "About post #4";
                    post4.counters = new Counters_1.Counters();
                    post4.counters.likes = 1;
                    return [4 /*yield*/, connection.manager.save(post4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: {
                                    id: undefined,
                                    name: undefined
                                }
                            }
                        }).getMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                        { id: 4, title: "Post #4", text: "About post #4", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should apply inner join if true is applied", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var post4, posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    post4 = new Post_1.Post();
                    post4.title = "Post #4";
                    post4.text = "About post #4";
                    post4.counters = new Counters_1.Counters();
                    post4.counters.likes = 1;
                    return [4 /*yield*/, connection.manager.save(post4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            where: {
                                author: true
                            }
                        }).getMany()];
                case 3:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=find-options-where.js.map