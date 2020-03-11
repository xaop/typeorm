"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
var Column_1 = require("../../../../src/decorator/columns/Column");
var LetterBox = /** @class */ (function () {
    function LetterBox() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], LetterBox.prototype, "id", void 0);
    tslib_1.__decorate([
        Column_1.Column({ type: "point", srid: 4326 }),
        tslib_1.__metadata("design:type", String)
    ], LetterBox.prototype, "coord", void 0);
    LetterBox = tslib_1.__decorate([
        src_1.Entity()
    ], LetterBox);
    return LetterBox;
}());
exports.LetterBox = LetterBox;
//# sourceMappingURL=LetterBox.js.map