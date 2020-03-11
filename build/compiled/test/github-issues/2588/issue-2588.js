"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var PostReview_1 = require("./entity/PostReview");
describe("github issues > #2588 - createQueryBuilder always does left joins on relations", function () {
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
    it("Should allow joins with conditions", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var postRepo, postReviewRepo, post, reviews, i, review, _a, _b, postFromDb;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    postRepo = connection.getRepository(Post_1.Post);
                    postReviewRepo = connection.getRepository(PostReview_1.PostReview);
                    post = new Post_1.Post();
                    post.title = "My blog post";
                    return [4 /*yield*/, postRepo.save(post)];
                case 1:
                    post = _c.sent();
                    reviews = [];
                    i = 1;
                    _c.label = 2;
                case 2:
                    if (!(i <= 5)) return [3 /*break*/, 5];
                    review = new PostReview_1.PostReview();
                    review.comment = "I give it a " + i;
                    review.rating = i;
                    review.post = post;
                    _b = (_a = reviews).push;
                    return [4 /*yield*/, postReviewRepo.save(review)];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, postRepo.findOne(post.id)];
                case 6:
                    postFromDb = _c.sent();
                    chai_1.expect(postFromDb).to.exist;
                    chai_1.expect(postFromDb.reviews).lengthOf(5);
                    return [4 /*yield*/, postRepo.createQueryBuilder("post")
                            .where("post.id = :postId", { postId: post.id })
                            .leftJoinAndSelect("post.reviews", "post_review", connection.driver.escape("post_review") + "." + connection.driver.escape("postId") + " = post.id AND post_review.rating >= 3")
                            .getOne()];
                case 7:
                    postFromDb = _c.sent();
                    chai_1.expect(postFromDb).to.exist;
                    chai_1.expect(postFromDb.reviews).lengthOf(3);
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-2588.js.map