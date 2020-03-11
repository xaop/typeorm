"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../entity/user");
var InsertUser0000000000003 = /** @class */ (function () {
    function InsertUser0000000000003() {
    }
    InsertUser0000000000003.prototype.up = function (queryRunner) {
        var userRepo = queryRunner.connection.getRepository(user_1.User);
        return userRepo.save(new user_1.User());
    };
    InsertUser0000000000003.prototype.down = function (queryRunner) {
        return Promise.resolve();
    };
    return InsertUser0000000000003;
}());
exports.InsertUser0000000000003 = InsertUser0000000000003;
//# sourceMappingURL=0000000000003-InsertUser.js.map