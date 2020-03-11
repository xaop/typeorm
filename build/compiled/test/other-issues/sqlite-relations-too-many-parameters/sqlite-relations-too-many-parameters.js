"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var Category_1 = require("./entity/Category");
var Post_1 = require("./entity/Post");
// we'll need to fix it later
describe.skip("other issues > sqlite relations too many parameters", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["sqlite"],
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should load 1200 relations without errors", function () { return Promise.all(connections.map(function (connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var post, categories1, i, categories2, i, categories3, i, postWithCategory;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        post = new Post_1.Post("hello post");
                        post.categories = [];
                        categories1 = [];
                        for (i = 1; i <= 400; i++) {
                            categories1.push(new Category_1.Category(String(i), "category #" + i));
                        }
                        return [4 /*yield*/, connection.manager.save(categories1)];
                    case 1:
                        _a.sent();
                        categories2 = [];
                        for (i = 401; i <= 800; i++) {
                            categories2.push(new Category_1.Category(String(i), "category #" + i));
                        }
                        return [4 /*yield*/, connection.manager.save(categories2)];
                    case 2:
                        _a.sent();
                        categories3 = [];
                        for (i = 801; i <= 1200; i++) {
                            categories3.push(new Category_1.Category(String(i), "category #" + i));
                        }
                        return [4 /*yield*/, connection.manager.save(categories3)];
                    case 3:
                        _a.sent();
                        post.categories = tslib_1.__spread(categories1);
                        return [4 /*yield*/, connection.manager.save(post)];
                    case 4:
                        _a.sent();
                        post.categories = tslib_1.__spread(categories1, categories2);
                        return [4 /*yield*/, connection.manager.save(post)];
                    case 5:
                        _a.sent();
                        post.categories = tslib_1.__spread(categories1, categories2, categories3);
                        return [4 /*yield*/, connection.manager.save(post)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(Post_1.Post, 1, {
                                relations: ["categories"]
                            })];
                    case 7:
                        postWithCategory = _a.sent();
                        // todo: tests are failing and I don't know what to do in there
                        // we probably need to change ids loading mechanizm or something
                        // because we cant avoid max argument number issue here
                        // because id is a string type, not a number
                        postWithCategory.categories.length.should.be.equal(1200);
                        return [2 /*return*/];
                }
            });
        });
    })); });
});
//# sourceMappingURL=sqlite-relations-too-many-parameters.js.map