"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var Dummy = /** @class */ (function () {
    function Dummy() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn({ unsigned: true }),
        tslib_1.__metadata("design:type", Number)
    ], Dummy.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.CreateDateColumn({ type: "int", default: function () { return "5"; } }),
        tslib_1.__metadata("design:type", Number)
    ], Dummy.prototype, "from", void 0);
    tslib_1.__decorate([
        src_1.Column({ type: "int", default: function () { return null; }, nullable: true }),
        tslib_1.__metadata("design:type", Number)
    ], Dummy.prototype, "to", void 0);
    Dummy = tslib_1.__decorate([
        src_1.Entity()
    ], Dummy);
    return Dummy;
}());
exports.Dummy = Dummy;
//# sourceMappingURL=MSSQLDummy.js.map