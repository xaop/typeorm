"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var find_options_test_utils_1 = require("./find-options-test-utils");
describe("find options > select", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({ __dirname: __dirname })];
            case 1: return [2 /*return*/, connections = _a.sent()];
        }
    }); }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("select id", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: ["id"],
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: {
                                id: true
                            },
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("select title", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: ["title"],
                            order: {
                                title: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { title: "Post #1" },
                        { title: "Post #2" },
                        { title: "Post #3" },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: {
                                title: true
                            },
                            order: {
                                title: "asc"
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { title: "Post #1" },
                        { title: "Post #2" },
                        { title: "Post #3" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("select title and text", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: ["title", "text"],
                            order: {
                                title: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { title: "Post #1", text: "About post #1" },
                        { title: "Post #2", text: "About post #2" },
                        { title: "Post #3", text: "About post #3" },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: {
                                title: true,
                                text: true
                            },
                            order: {
                                title: "asc"
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { title: "Post #1", text: "About post #1" },
                        { title: "Post #2", text: "About post #2" },
                        { title: "Post #3", text: "About post #3" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("select column in embed", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: {
                                counters: {
                                    likes: true
                                }
                            },
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        { counters: { likes: 1 } },
                        { counters: { likes: 2 } },
                        { counters: { likes: 1 } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=find-options-select.js.map