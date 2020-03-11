"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../../src");
/**
 * @deprecated use item config instead
 */
var Config = /** @class */ (function () {
    function Config() {
    }
    tslib_1.__decorate([
        src_1.ObjectIdColumn(),
        tslib_1.__metadata("design:type", src_1.ObjectID)
    ], Config.prototype, "_id", void 0);
    tslib_1.__decorate([
        src_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Config.prototype, "itemId", void 0);
    tslib_1.__decorate([
        src_1.Column({ type: "json" }),
        tslib_1.__metadata("design:type", Object)
    ], Config.prototype, "data", void 0);
    Config = tslib_1.__decorate([
        src_1.Entity()
    ], Config);
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.entity.js.map