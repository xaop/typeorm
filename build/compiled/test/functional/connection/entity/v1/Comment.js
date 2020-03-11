"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
var OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
var Index_1 = require("../../../../../src/decorator/Index");
var Guest_1 = require("./Guest");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    Comment_1 = Comment;
    tslib_1.__decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Comment.prototype, "id", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        Index_1.Index(),
        tslib_1.__metadata("design:type", String)
    ], Comment.prototype, "title", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Comment.prototype, "context", void 0);
    tslib_1.__decorate([
        OneToMany_1.OneToMany(function (type) { return Comment_1; }, function (comment) { return comment.relay; }),
        tslib_1.__metadata("design:type", Comment)
    ], Comment.prototype, "reference", void 0);
    tslib_1.__decorate([
        ManyToOne_1.ManyToOne(function (type) { return Comment_1; }, function (comment) { return comment.reference; }),
        tslib_1.__metadata("design:type", Comment)
    ], Comment.prototype, "relay", void 0);
    tslib_1.__decorate([
        ManyToOne_1.ManyToOne(function (type) { return Guest_1.Guest; }, function (guest) { return guest.comments; }),
        tslib_1.__metadata("design:type", Guest_1.Guest)
    ], Comment.prototype, "author", void 0);
    Comment = Comment_1 = tslib_1.__decorate([
        Entity_1.Entity(),
        Index_1.Index("author_and_title_unique", ["author", "title"], { unique: true })
    ], Comment);
    return Comment;
    var Comment_1;
}());
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map