"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var Item = /** @class */ (function () {
    function Item() {
    }
    tslib_1.__decorate([
        src_1.ObjectIdColumn(),
        tslib_1.__metadata("design:type", src_1.ObjectID)
    ], Item.prototype, "_id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Item.prototype, "contact", void 0);
    tslib_1.__decorate([
        src_1.Column({ array: true }),
        tslib_1.__metadata("design:type", Array)
    ], Item.prototype, "contacts", void 0);
    tslib_1.__decorate([
        src_1.Column({ type: "json" }),
        tslib_1.__metadata("design:type", Object)
    ], Item.prototype, "config", void 0);
    Item = tslib_1.__decorate([
        src_1.Entity()
    ], Item);
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map