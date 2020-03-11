"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AccessToken_1 = require("./AccessToken");
var JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
var OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Generated_1 = require("../../../../src/decorator/Generated");
var User = /** @class */ (function () {
    function User() {
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        Generated_1.Generated(),
        tslib_1.__metadata("design:type", Number)
    ], User.prototype, "primaryKey", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "email", void 0);
    tslib_1.__decorate([
        OneToOne_1.OneToOne(function (type) { return AccessToken_1.AccessToken; }, function (token) { return token.user; }),
        JoinColumn_1.JoinColumn(),
        tslib_1.__metadata("design:type", AccessToken_1.AccessToken)
    ], User.prototype, "access_token", void 0);
    User = tslib_1.__decorate([
        Entity_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map