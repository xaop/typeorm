"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
exports.Sample33CustomRepositoryConnection = index_1.connection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    logging: ["query", "error"],
});
//# sourceMappingURL=connection.js.map