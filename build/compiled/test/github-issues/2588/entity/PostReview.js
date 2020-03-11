"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var Post_1 = require("./Post");
var PostReview = /** @class */ (function () {
    function PostReview() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], PostReview.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], PostReview.prototype, "rating", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], PostReview.prototype, "comment", void 0);
    tslib_1.__decorate([
        src_1.ManyToOne(function (type) { return Post_1.Post; }),
        tslib_1.__metadata("design:type", Post_1.Post)
    ], PostReview.prototype, "post", void 0);
    PostReview = tslib_1.__decorate([
        src_1.Entity()
    ], PostReview);
    return PostReview;
}());
exports.PostReview = PostReview;
//# sourceMappingURL=PostReview.js.map