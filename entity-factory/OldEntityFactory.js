"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OldEntityFactory = /** @class */ (function () {
    function OldEntityFactory() {
    }
    /**
     * Returns an entity object
     */
    OldEntityFactory.prototype.createEntity = function (target) {
        return new target();
    };
    return OldEntityFactory;
}());
exports.OldEntityFactory = OldEntityFactory;

//# sourceMappingURL=OldEntityFactory.js.map
