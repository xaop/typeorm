"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Column_1 = require("../../../../src/decorator/columns/Column");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Index_1 = require("../../../../src/decorator/Index");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    tslib_1.__decorate([
        Column_1.Column("date"),
        Index_1.Index({ expireAfterSeconds: 0 }),
        tslib_1.__metadata("design:type", Date)
    ], Foo.prototype, "expireAt", void 0);
    Foo = tslib_1.__decorate([
        Entity_1.Entity()
    ], Foo);
    return Foo;
}());
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map