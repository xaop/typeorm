"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Book = /** @class */ (function () {
    function Book() {
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", String)
    ], Book.prototype, "ean", void 0);
    Book = tslib_1.__decorate([
        Entity_1.Entity()
    ], Book);
    return Book;
}());
exports.Book = Book;
var Book2 = /** @class */ (function () {
    function Book2() {
    }
    tslib_1.__decorate([
        PrimaryColumn_1.PrimaryColumn(),
        tslib_1.__metadata("design:type", String)
    ], Book2.prototype, "ean", void 0);
    Book2 = tslib_1.__decorate([
        Entity_1.Entity({ withoutRowid: true })
    ], Book2);
    return Book2;
}());
exports.Book2 = Book2;
//# sourceMappingURL=Book.js.map