"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../../src");
var Tag_1 = require("./Tag");
var Author_1 = require("./Author");
var Counters_1 = require("./Counters");
var Post = /** @class */ (function () {
    function Post() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Post.prototype, "text", void 0);
    tslib_1.__decorate([
        src_1.ManyToMany(function () { return Tag_1.Tag; }, function (tag) { return tag.posts; }),
        src_1.JoinTable(),
        tslib_1.__metadata("design:type", Array)
    ], Post.prototype, "tags", void 0);
    tslib_1.__decorate([
        src_1.ManyToOne(function () { return Author_1.Author; }),
        tslib_1.__metadata("design:type", Author_1.Author)
    ], Post.prototype, "author", void 0);
    tslib_1.__decorate([
        src_1.Column(function () { return Counters_1.Counters; }),
        tslib_1.__metadata("design:type", Counters_1.Counters)
    ], Post.prototype, "counters", void 0);
    Post = tslib_1.__decorate([
        src_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map