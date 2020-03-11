"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var src_1 = require("../../../src");
var test_utils_1 = require("../../utils/test-utils");
var User_1 = require("./entity/User");
describe("github issues > #4753 MySQL Replication Config broken", function () {
    var connections = [];
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should connect without error when using replication", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var connection;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = src_1.getConnectionManager().create({
                        type: "mysql",
                        replication: {
                            master: {
                                username: "test",
                                password: "test",
                                database: "test"
                            },
                            slaves: [
                                {
                                    username: "test",
                                    password: "test",
                                    database: "test"
                                }
                            ]
                        },
                        entities: [User_1.User]
                    });
                    connections.push(connection);
                    return [4 /*yield*/, connection.connect()];
                case 1:
                    _a.sent();
                    connection.isConnected.should.be.true;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=issue-4753.js.map