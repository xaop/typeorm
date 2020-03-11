"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chai_1 = require("chai");
require("reflect-metadata");
var Category_1 = require("./entity/Category");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var PostCategory_1 = require("./entity/PostCategory");
var PostByCategory_1 = require("./entity/PostByCategory");
describe("view entity > postgres", function () {
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
    it("should create entity view from string definition", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var queryRunner, postCategory;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getView("post_category")];
                case 1:
                    postCategory = _a.sent();
                    chai_1.expect(postCategory).to.be.exist;
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should not return data without refreshing the materialized view", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var queryRunner, category1, post1, emptyResult, resultWithData;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryRunner = connection.createQueryRunner();
                    category1 = new Category_1.Category();
                    category1.name = "Cars";
                    return [4 /*yield*/, queryRunner.manager.save(category1)];
                case 1:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.name = "About BMW";
                    post1.categoryId = category1.id;
                    return [4 /*yield*/, queryRunner.manager.save(post1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.manager.find(PostByCategory_1.PostByCategory)];
                case 3:
                    emptyResult = _a.sent();
                    emptyResult.length.should.be.equal(0);
                    return [4 /*yield*/, queryRunner.query("REFRESH MATERIALIZED VIEW post_by_category")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, queryRunner.manager.find(PostByCategory_1.PostByCategory)];
                case 5:
                    resultWithData = _a.sent();
                    resultWithData.length.should.be.equal(1);
                    chai_1.expect(resultWithData[0].categoryName).to.eq(category1.name);
                    chai_1.expect(Number(resultWithData[0].postCount)).to.eq(1);
                    return [4 /*yield*/, queryRunner.release()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should correctly return data from View", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var category1, category2, post1, post2, postCategories;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category1 = new Category_1.Category();
                    category1.name = "Cars";
                    return [4 /*yield*/, connection.manager.save(category1)];
                case 1:
                    _a.sent();
                    category2 = new Category_1.Category();
                    category2.name = "Airplanes";
                    return [4 /*yield*/, connection.manager.save(category2)];
                case 2:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.name = "About BMW";
                    post1.categoryId = category1.id;
                    return [4 /*yield*/, connection.manager.save(post1)];
                case 3:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.name = "About Boeing";
                    post2.categoryId = category2.id;
                    return [4 /*yield*/, connection.manager.save(post2)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.manager.find(PostCategory_1.PostCategory)];
                case 5:
                    postCategories = _a.sent();
                    postCategories.length.should.be.equal(2);
                    postCategories[0].id.should.be.equal(1);
                    postCategories[0].name.should.be.equal("About BMW");
                    postCategories[0].categoryName.should.be.equal("Cars");
                    postCategories[1].id.should.be.equal(2);
                    postCategories[1].name.should.be.equal("About Boeing");
                    postCategories[1].categoryName.should.be.equal("Airplanes");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=view-entity-postgres.js.map