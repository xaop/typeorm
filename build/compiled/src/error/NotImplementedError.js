"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * Thrown when the interface is not implemented for the given adapter.
 */
var NotImplementedError = /** @class */ (function (_super) {
    tslib_1.__extends(NotImplementedError, _super);
    function NotImplementedError() {
        var _this = _super.call(this) || this;
        _this.name = "NotImplementedError";
        Object.setPrototypeOf(_this, NotImplementedError.prototype);
        _this.message = "Function not implemented.";
        return _this;
    }
    return NotImplementedError;
}(Error));
exports.NotImplementedError = NotImplementedError;
//# sourceMappingURL=NotImplementedError.js.map