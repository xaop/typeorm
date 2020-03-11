"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Category = /** @class */ (function () {
    function Category(id, name) {
        if (id)
            this.id = id;
        if (name)
            this.name = name;
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", String)
    ], Category.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Category.prototype, "name", void 0);
    Category = tslib_1.__decorate([
        src_1.Entity(),
        tslib_1.__metadata("design:paramtypes", [String, String])
    ], Category);
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=Category.js.map