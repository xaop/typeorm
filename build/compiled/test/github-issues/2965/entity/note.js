"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require("../../../../src/");
var person_1 = require("./person");
var Note = /** @class */ (function () {
    function Note() {
    }
    tslib_1.__decorate([
        _1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Note.prototype, "id", void 0);
    tslib_1.__decorate([
        _1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Note.prototype, "label", void 0);
    tslib_1.__decorate([
        _1.ManyToOne(function (type) { return person_1.Person; }, function (owner) { return owner.notes; }, { lazy: true }),
        tslib_1.__metadata("design:type", Object)
    ], Note.prototype, "owner", void 0);
    Note = tslib_1.__decorate([
        _1.Entity()
    ], Note);
    return Note;
}());
exports.Note = Note;
//# sourceMappingURL=note.js.map