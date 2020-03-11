"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var find_options_test_utils_1 = require("./find-options-test-utils");
var PostgresDriver_1 = require("../../../../src/driver/postgres/PostgresDriver");
describe("find options > relations", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({ __dirname: __dirname })];
            case 1: return [2 /*return*/, connections = _a.sent()];
        }
    }); }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("basic relation", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts1, posts2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            relations: {
                                author: true
                            },
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts1 = _a.sent();
                    posts1.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 }, author: { id: 1, age: 25, firstName: "Timber", lastName: "Saw" } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 }, author: { id: 1, age: 25, firstName: "Timber", lastName: "Saw" } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 }, author: { id: 2, age: 52, firstName: "Gyro", lastName: "Copter" } },
                    ]);
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            relations: ["author"],
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 3:
                    posts2 = _a.sent();
                    posts2.should.be.eql([
                        { id: 1, title: "Post #1", text: "About post #1", counters: { likes: 1 }, author: { id: 1, age: 25, firstName: "Timber", lastName: "Saw" } },
                        { id: 2, title: "Post #2", text: "About post #2", counters: { likes: 2 }, author: { id: 1, age: 25, firstName: "Timber", lastName: "Saw" } },
                        { id: 3, title: "Post #3", text: "About post #3", counters: { likes: 1 }, author: { id: 2, age: 52, firstName: "Gyro", lastName: "Copter" } },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("complex relation #1", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (connection.driver instanceof PostgresDriver_1.PostgresDriver)
                        return [2 /*return*/];
                    return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: {
                                author: {
                                    id: true,
                                    age: true
                                }
                            },
                            relations: {
                                author: {
                                    photos: true
                                }
                            },
                            order: {
                                author: {
                                    age: "desc",
                                    photos: {
                                        filename: "asc"
                                    }
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        {
                            id: 3,
                            title: "Post #3",
                            text: "About post #3",
                            counters: {
                                likes: 1
                            },
                            author: {
                                id: 2,
                                age: 52,
                                photos: []
                            }
                        },
                        {
                            id: 1,
                            title: "Post #1",
                            text: "About post #1",
                            counters: {
                                likes: 1
                            },
                            author: {
                                id: 1,
                                age: 25,
                                photos: [
                                    { id: 2, filename: "chain.jpg", description: "Me and chain" },
                                    { id: 1, filename: "saw.jpg", description: "Me and saw" }
                                ]
                            }
                        },
                        {
                            id: 2,
                            title: "Post #2",
                            text: "About post #2",
                            counters: {
                                likes: 2
                            },
                            author: {
                                id: 1,
                                age: 25,
                                photos: [
                                    { id: 2, filename: "chain.jpg", description: "Me and chain" },
                                    { id: 1, filename: "saw.jpg", description: "Me and saw" }
                                ]
                            }
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("complex relation #2", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            select: {
                                tags: {
                                    id: true
                                }
                            },
                            relations: {
                                author: ["photos"],
                                tags: true
                            },
                            order: {
                                id: "asc"
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        {
                            id: 1,
                            title: "Post #1",
                            text: "About post #1",
                            counters: {
                                likes: 1
                            },
                            author: {
                                id: 1,
                                age: 25,
                                firstName: "Timber",
                                lastName: "Saw",
                                photos: [
                                    { id: 1, filename: "saw.jpg", description: "Me and saw" },
                                    { id: 2, filename: "chain.jpg", description: "Me and chain" }
                                ]
                            },
                            tags: [
                                { id: 1 },
                                { id: 2 },
                            ]
                        },
                        {
                            id: 2,
                            title: "Post #2",
                            text: "About post #2",
                            counters: {
                                likes: 2
                            },
                            author: {
                                id: 1,
                                age: 25,
                                firstName: "Timber",
                                lastName: "Saw",
                                photos: [
                                    { id: 1, filename: "saw.jpg", description: "Me and saw" },
                                    { id: 2, filename: "chain.jpg", description: "Me and chain" }
                                ]
                            },
                            tags: [
                                { id: 2 }
                            ]
                        },
                        {
                            id: 3,
                            title: "Post #3",
                            text: "About post #3",
                            counters: {
                                likes: 1
                            },
                            author: {
                                id: 2,
                                firstName: "Gyro",
                                lastName: "Copter",
                                age: 52,
                                photos: []
                            },
                            tags: [
                                { id: 1 }
                            ]
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("relation in embed", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var posts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, find_options_test_utils_1.prepareData(connection.manager)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.createQueryBuilder(Post_1.Post, "post").setFindOptions({
                            relations: {
                                counters: {
                                    likedUsers: {
                                        photos: true
                                    }
                                }
                            }
                        }).getMany()];
                case 2:
                    posts = _a.sent();
                    posts.should.be.eql([
                        {
                            id: 1,
                            title: "Post #1",
                            text: "About post #1",
                            counters: {
                                likes: 1,
                                likedUsers: [{
                                        id: 1,
                                        age: 25,
                                        firstName: "Timber",
                                        lastName: "Saw",
                                        photos: [
                                            { id: 1, filename: "saw.jpg", description: "Me and saw" },
                                            { id: 2, filename: "chain.jpg", description: "Me and chain" }
                                        ]
                                    }]
                            },
                        },
                        {
                            id: 2,
                            title: "Post #2",
                            text: "About post #2",
                            counters: {
                                likes: 2,
                                likedUsers: [{
                                        id: 1,
                                        age: 25,
                                        firstName: "Timber",
                                        lastName: "Saw",
                                        photos: [
                                            { id: 1, filename: "saw.jpg", description: "Me and saw" },
                                            { id: 2, filename: "chain.jpg", description: "Me and chain" }
                                        ]
                                    }, {
                                        id: 2,
                                        firstName: "Gyro",
                                        lastName: "Copter",
                                        age: 52,
                                        photos: []
                                    }]
                            },
                        },
                        {
                            id: 3,
                            title: "Post #3",
                            text: "About post #3",
                            counters: {
                                likes: 1,
                                likedUsers: [{
                                        id: 2,
                                        firstName: "Gyro",
                                        lastName: "Copter",
                                        age: 52,
                                        photos: []
                                    }]
                            },
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=find-options-relations.js.map