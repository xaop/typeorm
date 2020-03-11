"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../../src");
var Photo_1 = require("./Photo");
var Author = /** @class */ (function () {
    function Author() {
    }
    tslib_1.__decorate([
        src_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Author.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Author.prototype, "firstName", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Author.prototype, "lastName", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Author.prototype, "age", void 0);
    tslib_1.__decorate([
        src_1.OneToMany(function () { return Photo_1.Photo; }, function (photo) { return photo.author; }),
        tslib_1.__metadata("design:type", Array)
    ], Author.prototype, "photos", void 0);
    Author = tslib_1.__decorate([
        src_1.Entity()
    ], Author);
    return Author;
}());
exports.Author = Author;
//# sourceMappingURL=Author.js.map