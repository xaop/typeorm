"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplyValueTransformers = /** @class */ (function () {
    function ApplyValueTransformers() {
    }
    ApplyValueTransformers.transformFrom = function (transformer, databaseValue) {
        if (Array.isArray(transformer)) {
            var reverseTransformers = transformer.slice().reverse();
            return reverseTransformers.reduce(function (transformedValue, _transformer) {
                if (_transformer.from !== undefined) {
                    return _transformer.from(transformedValue);
                }
                return transformedValue;
            }, databaseValue);
        }
        if (transformer.from !== undefined) {
            return transformer.from(databaseValue);
        }
        return databaseValue;
    };
    ApplyValueTransformers.transformTo = function (transformer, entityValue) {
        if (Array.isArray(transformer)) {
            return transformer.reduce(function (transformedValue, _transformer) {
                if (_transformer.to !== undefined) {
                    return _transformer.to(transformedValue);
                }
                return transformedValue;
            }, entityValue);
        }
        if (transformer.to !== undefined) {
            return transformer.to(entityValue);
        }
        return entityValue;
    };
    return ApplyValueTransformers;
}());
exports.ApplyValueTransformers = ApplyValueTransformers;

//# sourceMappingURL=ApplyValueTransformers.js.map
