"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var Column_1 = require("../../../../src/decorator/columns/Column");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var TestEntity = /** @class */ (function () {
    function TestEntity() {
    }
    tslib_1.__decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], TestEntity.prototype, "id", void 0);
    tslib_1.__decorate([
        Column_1.Column({ type: "varchar", length: 100, nullable: true, unique: true }),
        tslib_1.__metadata("design:type", String)
    ], TestEntity.prototype, "unique_column", void 0);
    tslib_1.__decorate([
        Column_1.Column({ type: "varchar", length: 100, nullable: true, unique: false }),
        tslib_1.__metadata("design:type", String)
    ], TestEntity.prototype, "nonunique_column", void 0);
    TestEntity = tslib_1.__decorate([
        Entity_1.Entity()
    ], TestEntity);
    return TestEntity;
}());
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map