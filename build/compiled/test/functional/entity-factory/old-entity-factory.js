"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var chai_1 = require("chai");
var test_utils_1 = require("../../utils/test-utils");
var Post_1 = require("./entity/Post");
var src_1 = require("../../../src");
describe("entity-factory > old entity factory", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Post_1.Post],
                        /**
                         * Using the old entity factory that creates entities by
                         * calling constructors.
                         */
                        entityFactory: new src_1.OldEntityFactory(),
                        dropSchema: true
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should call the constructor", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var postRepository, post, loadedPost;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    post = new Post_1.Post("About columns");
                    return [4 /*yield*/, postRepository.save(post)];
                case 1:
                    _a.sent();
                    chai_1.expect(post.initialized).to.be.true;
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).to.be.instanceof(Post_1.Post);
                    chai_1.expect(loadedPost.initialized).to.be.true;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=old-entity-factory.js.map