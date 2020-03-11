"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var chai_1 = require("chai");
var test_utils_1 = require("../../../utils/test-utils");
var Category_1 = require("./entity/Category");
var User_1 = require("./entity/User");
var Post_1 = require("./entity/Post");
describe("query builder > distinct on", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["postgres"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    function prepareData(connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var users, categories, posts;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = [
                            {
                                name: "Dion"
                            },
                            {
                                name: "Zelda"
                            },
                            {
                                name: "Sarah"
                            },
                            {
                                name: "Pablo"
                            }
                        ];
                        return [4 /*yield*/, connection.createQueryBuilder()
                                .insert()
                                .into(User_1.User)
                                .values(users)
                                .execute()];
                    case 1:
                        _a.sent();
                        categories = [
                            {
                                title: "Category One",
                                author: "Dion"
                            },
                            {
                                title: "Category Two",
                                author: "Dion"
                            },
                            {
                                title: "Category Three",
                                author: "Zelda"
                            },
                            {
                                title: "Category Four",
                                author: "Zelda"
                            },
                            {
                                title: "Category Five",
                                author: "Dion"
                            }
                        ];
                        return [4 /*yield*/, connection.createQueryBuilder()
                                .insert()
                                .into(Category_1.Category)
                                .values(categories)
                                .execute()];
                    case 2:
                        _a.sent();
                        posts = [
                            {
                                title: "Post One",
                                author: "Dion",
                                moderator: "Dion"
                            },
                            {
                                title: "Post Two",
                                author: "Sarah",
                                moderator: "Dion"
                            },
                            {
                                title: "Post Three",
                                author: "Zelda",
                                moderator: "Dion"
                            },
                            {
                                title: "Post Four",
                                author: "Sarah",
                                moderator: "Dion"
                            },
                            {
                                title: "Post Five",
                                author: "Pablo",
                                moderator: "Sarah"
                            }
                        ];
                        return [4 /*yield*/, connection.createQueryBuilder()
                                .insert()
                                .into(Post_1.Post)
                                .values(posts)
                                .execute()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    it("should perform distinct on category authors", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepareData(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.createQueryBuilder(Category_1.Category, "category")
                            .distinctOn(["category.author"])
                            .getMany()];
                case 2:
                    result = _a.sent();
                    chai_1.expect(result.map(function (_a) {
                        var author = _a.author;
                        return author;
                    })).to.have.members(["Dion", "Zelda"]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should perform distinct on post authors and moderators combination", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepareData(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.createQueryBuilder(Post_1.Post, "post")
                            .distinctOn(["post.author", "post.moderator"])
                            .getMany()];
                case 2:
                    result = _a.sent();
                    chai_1.expect(result.map(function (_a) {
                        var moderator = _a.moderator;
                        return moderator;
                    })).to.have.members(["Dion", "Sarah", "Dion", "Dion"]) &&
                        chai_1.expect(result.map(function (_a) {
                            var author = _a.author;
                            return author;
                        })).to.have.members(["Dion", "Pablo", "Sarah", "Zelda"]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should perform distinct on post and category authors", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepareData(connection)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.createQueryBuilder(Post_1.Post, "post")
                            .leftJoinAndSelect(Category_1.Category, "category", "category.author = post.author")
                            .distinctOn(["post.author", "category.author"])
                            .getMany()];
                case 2:
                    result = _a.sent();
                    chai_1.expect(result.map(function (_a) {
                        var author = _a.author;
                        return author;
                    })).to.have.members(["Dion", "Pablo", "Sarah", "Zelda"]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=query-builder-distinct-on.js.map