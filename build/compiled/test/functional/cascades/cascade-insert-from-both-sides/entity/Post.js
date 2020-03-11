"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var PostDetails_1 = require("./PostDetails");
var OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
var Post = /** @class */ (function () {
    function Post() {
    }
    tslib_1.__decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Post.prototype, "key", void 0);
    tslib_1.__decorate([
        OneToOne_1.OneToOne(function (type) { return PostDetails_1.PostDetails; }, function (details) { return details.post; }, {
            cascade: ["insert"]
        }),
        JoinColumn_1.JoinColumn(),
        tslib_1.__metadata("design:type", PostDetails_1.PostDetails)
    ], Post.prototype, "details", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    Post = tslib_1.__decorate([
        Entity_1.Entity()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map