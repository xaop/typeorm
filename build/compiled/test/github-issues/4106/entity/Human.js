"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var GenderEnum_1 = require("./GenderEnum");
var Human = /** @class */ (function () {
    function Human() {
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Human.prototype, "id", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Human.prototype, "name", void 0);
    tslib_1.__decorate([
        Column_1.Column({
            type: "enum",
            enum: GenderEnum_1.Gender,
            enumName: "genderEnum",
            name: "Gender"
        }),
        tslib_1.__metadata("design:type", String)
    ], Human.prototype, "gender", void 0);
    Human = tslib_1.__decorate([
        Entity_1.Entity()
    ], Human);
    return Human;
}());
exports.Human = Human;
//# sourceMappingURL=Human.js.map