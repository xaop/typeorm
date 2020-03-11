"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var User = /** @class */ (function () {
    function User() {
    }
    tslib_1.__decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn("uuid"),
        tslib_1.__metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    User = tslib_1.__decorate([
        Entity_1.Entity({ name: "users", synchronize: false })
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map