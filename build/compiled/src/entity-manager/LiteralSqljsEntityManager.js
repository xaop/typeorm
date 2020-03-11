"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LiteralEntityManager_1 = require("./LiteralEntityManager");
/**
 * A special EntityManager that includes import/export and load/save function
 * that are unique to Sql.js.
 */
function createLiteralSqljsEntityManager(_a) {
    var connection = _a.connection, queryRunner = _a.queryRunner;
    var driver = connection.driver;
    return tslib_1.__assign({}, LiteralEntityManager_1.createLiteralEntityManager({ connection: connection, queryRunner: queryRunner }), { typeof: "SqljsEntityManager", // todo: fix as any
        loadDatabase: function (fileNameOrLocalStorageOrData) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, driver.load(fileNameOrLocalStorageOrData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        saveDatabase: function (fileNameOrLocalStorage) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, driver.save(fileNameOrLocalStorage)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        exportDatabase: function () {
            return driver.export();
        } });
}
exports.createLiteralSqljsEntityManager = createLiteralSqljsEntityManager;
//# sourceMappingURL=LiteralSqljsEntityManager.js.map