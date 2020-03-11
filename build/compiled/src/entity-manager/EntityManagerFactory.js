"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDriver_1 = require("../driver/mongodb/MongoDriver");
var SqljsDriver_1 = require("../driver/sqljs/SqljsDriver");
var LiteralEntityManager_1 = require("./LiteralEntityManager");
var LiteralMongoEntityManager_1 = require("./LiteralMongoEntityManager");
var LiteralSqljsEntityManager_1 = require("./LiteralSqljsEntityManager");
/**
 * Helps to create entity managers.
 */
var EntityManagerFactory = /** @class */ (function () {
    function EntityManagerFactory() {
    }
    /**
     * Creates a new entity manager depend on a given connection's driver.
     */
    EntityManagerFactory.prototype.create = function (connection, queryRunner) {
        if (connection.driver instanceof MongoDriver_1.MongoDriver)
            return LiteralMongoEntityManager_1.createLiteralMongoEntityManager({ connection: connection });
        if (connection.driver instanceof SqljsDriver_1.SqljsDriver)
            return LiteralSqljsEntityManager_1.createLiteralSqljsEntityManager({ connection: connection, queryRunner: queryRunner });
        return LiteralEntityManager_1.createLiteralEntityManager({ connection: connection, queryRunner: queryRunner });
    };
    return EntityManagerFactory;
}());
exports.EntityManagerFactory = EntityManagerFactory;
//# sourceMappingURL=EntityManagerFactory.js.map