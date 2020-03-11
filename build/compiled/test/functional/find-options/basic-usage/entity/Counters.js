"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../../src");
var Author_1 = require("./Author");
var Counters = /** @class */ (function () {
    function Counters() {
    }
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Counters.prototype, "likes", void 0);
    tslib_1.__decorate([
        src_1.ManyToMany(function () { return Author_1.Author; }),
        src_1.JoinTable(),
        tslib_1.__metadata("design:type", Array)
    ], Counters.prototype, "likedUsers", void 0);
    return Counters;
}());
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map