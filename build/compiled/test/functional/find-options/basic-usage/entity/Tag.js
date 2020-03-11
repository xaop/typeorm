"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../../src");
var Post_1 = require("./Post");
var Tag = /** @class */ (function () {
    function Tag() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Tag.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Tag.prototype, "name", void 0);
    tslib_1.__decorate([
        src_1.ManyToMany(function () { return Post_1.Post; }, function (post) { return post.tags; }),
        tslib_1.__metadata("design:type", Array)
    ], Tag.prototype, "posts", void 0);
    Tag = tslib_1.__decorate([
        src_1.Entity()
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map