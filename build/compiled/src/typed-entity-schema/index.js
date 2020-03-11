"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var __1 = require("..");
/**
 * Creates a new Entity Schema.
 */
function entity(name, options) {
    var entityName = typeof name === "string" ? name : name.name;
    return new __1.EntitySchema(tslib_1.__assign({ name: entityName }, options));
}
exports.entity = entity;
//# sourceMappingURL=index.js.map