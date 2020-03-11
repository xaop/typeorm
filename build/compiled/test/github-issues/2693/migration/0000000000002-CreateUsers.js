"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Table_1 = require("../../../../src/schema-builder/table/Table");
var CreateUsers0000000000002 = /** @class */ (function () {
    function CreateUsers0000000000002() {
    }
    CreateUsers0000000000002.prototype.up = function (queryRunner) {
        return queryRunner.createTable(new Table_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: "uuid_generate_v4()"
                }
            ]
        }));
    };
    CreateUsers0000000000002.prototype.down = function (queryRunner) {
        return queryRunner.dropTable("users");
    };
    return CreateUsers0000000000002;
}());
exports.CreateUsers0000000000002 = CreateUsers0000000000002;
//# sourceMappingURL=0000000000002-CreateUsers.js.map