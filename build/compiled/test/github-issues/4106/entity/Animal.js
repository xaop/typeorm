"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var GenderEnum_1 = require("./GenderEnum");
var Animal = /** @class */ (function () {
    function Animal() {
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Animal.prototype, "id", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Animal.prototype, "name", void 0);
    tslib_1.__decorate([
        Column_1.Column({
            type: "enum",
            enum: GenderEnum_1.Gender,
            enumName: "genderEnum"
        }),
        tslib_1.__metadata("design:type", String)
    ], Animal.prototype, "gender", void 0);
    tslib_1.__decorate([
        Column_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Animal.prototype, "specie", void 0);
    Animal = tslib_1.__decorate([
        Entity_1.Entity()
    ], Animal);
    return Animal;
}());
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map