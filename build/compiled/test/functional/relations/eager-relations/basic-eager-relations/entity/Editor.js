"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../../../src/decorator/entity/Entity");
var OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
var JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
var User_1 = require("./User");
var ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
var Post_1 = require("./Post");
var PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
var Editor = /** @class */ (function () {
    function Editor() {
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Editor.prototype, "userId", void 0);
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Editor.prototype, "postId", void 0);
    tslib_1.__decorate([
        OneToOne_1.OneToOne(function (type) { return User_1.User; }, { eager: true }),
        JoinColumn_1.JoinColumn(),
        tslib_1.__metadata("design:type", User_1.User)
    ], Editor.prototype, "user", void 0);
    tslib_1.__decorate([
        ManyToOne_1.ManyToOne(function (type) { return Post_1.Post; }),
        tslib_1.__metadata("design:type", Post_1.Post)
    ], Editor.prototype, "post", void 0);
    Editor = tslib_1.__decorate([
        Entity_1.Entity()
    ], Editor);
    return Editor;
}());
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map