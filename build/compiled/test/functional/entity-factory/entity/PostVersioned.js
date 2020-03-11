"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var VersionColumn_1 = require("../../../../src/decorator/columns/VersionColumn");
var PostVersioned = /** @class */ (function () {
    function PostVersioned(title) {
        this.title = title;
        this.initialized = true;
    }
    PostVersioned.prototype.getTitle = function () {
        return this.title;
    };
    tslib_1.__decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], PostVersioned.prototype, "id", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], PostVersioned.prototype, "title", void 0);
    tslib_1.__decorate([
        VersionColumn_1.VersionColumn(),
        tslib_1.__metadata("design:type", Number)
    ], PostVersioned.prototype, "version", void 0);
    PostVersioned = tslib_1.__decorate([
        Entity_1.Entity(),
        tslib_1.__metadata("design:paramtypes", [String])
    ], PostVersioned);
    return PostVersioned;
}());
exports.PostVersioned = PostVersioned;
//# sourceMappingURL=PostVersioned.js.map