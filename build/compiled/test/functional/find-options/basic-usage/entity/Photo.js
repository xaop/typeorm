"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../../src");
var Author_1 = require("./Author");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Photo.prototype, "filename", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Photo.prototype, "description", void 0);
    tslib_1.__decorate([
        src_1.ManyToOne(function () { return Author_1.Author; }, function (author) { return author.photos; }),
        tslib_1.__metadata("design:type", Author_1.Author)
    ], Photo.prototype, "author", void 0);
    Photo = tslib_1.__decorate([
        src_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map