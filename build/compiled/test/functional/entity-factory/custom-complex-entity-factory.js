"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var chai_1 = require("chai");
var test_utils_1 = require("../../utils/test-utils");
var Post_1 = require("./entity/Post");
var PostVersioned_1 = require("./entity/PostVersioned");
describe("entity-factory > custom complex entity factory", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Post_1.Post, PostVersioned_1.PostVersioned],
                        entityFactory: {
                            createEntity: function (target, entityMetadata) {
                                // Creating an entity not initialized by constructor
                                // (Same as default behavior)
                                var entity = {};
                                Reflect.setPrototypeOf(entity, target.prototype);
                                // Proxifying the entity to intercept method calls.
                                // Here we choose to only proxify our versioned entities.
                                // Other entities are not proxified.
                                if (entityMetadata.versionColumn) {
                                    return new Proxy(entity, {
                                        get: function (target, propKey, receiver) {
                                            var property = target[propKey];
                                            if (property instanceof Function) {
                                                return function () {
                                                    var args = [];
                                                    for (var _i = 0; _i < arguments.length; _i++) {
                                                        args[_i] = arguments[_i];
                                                    }
                                                    var result = property.apply(this, args);
                                                    return result + " !!!";
                                                };
                                            }
                                            return property;
                                        }
                                    });
                                }
                                return entity;
                            }
                        },
                        dropSchema: true
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should proxify versioned entity", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var postVersionedRepository, postVersioned, loadedPostVersioned;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postVersionedRepository = connection.getRepository(PostVersioned_1.PostVersioned);
                    postVersioned = new PostVersioned_1.PostVersioned("About columns");
                    return [4 /*yield*/, postVersionedRepository.save(postVersioned)];
                case 1:
                    _a.sent();
                    chai_1.expect(postVersioned.initialized).to.be.true;
                    return [4 /*yield*/, postVersionedRepository.findOne(1)];
                case 2:
                    loadedPostVersioned = _a.sent();
                    chai_1.expect(loadedPostVersioned).to.be.instanceof(PostVersioned_1.PostVersioned);
                    chai_1.expect(loadedPostVersioned.initialized).to.be.undefined;
                    chai_1.expect(loadedPostVersioned.getTitle()).to.be.equal("About columns !!!");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should not proxify non-versioned entity", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    chai_1.expect(loadedPost.initialized).to.be.undefined;
                    chai_1.expect(loadedPost.getTitle()).to.be.equal("About columns");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=custom-complex-entity-factory.js.map