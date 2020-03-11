"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUuidExtension0000000000001 = /** @class */ (function () {
    function CreateUuidExtension0000000000001() {
    }
    CreateUuidExtension0000000000001.prototype.up = function (queryRunner) {
        return queryRunner.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";");
    };
    CreateUuidExtension0000000000001.prototype.down = function (queryRunner) {
        return queryRunner.query("DROP EXTENSION \"uuid-ossp\"");
    };
    return CreateUuidExtension0000000000001;
}());
exports.CreateUuidExtension0000000000001 = CreateUuidExtension0000000000001;
//# sourceMappingURL=0000000000001-CreateUuidExtension.js.map