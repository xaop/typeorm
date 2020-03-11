"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Item = /** @class */ (function () {
    function Item() {
    }
    tslib_1.__decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Item.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.CreateDateColumn(),
        tslib_1.__metadata("design:type", Date)
    ], Item.prototype, "date", void 0);
    Item = tslib_1.__decorate([
        Entity_1.Entity()
    ], Item);
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=Item.js.map