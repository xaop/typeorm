"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var test_utils_1 = require("../../utils/test-utils");
var Post_1 = require("./entity/Post");
describe("other issues > bulk save in sqlite", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["sqlite"]
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should save entities in bulk", function () { return Promise.all(connections.map(function (connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var posts, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        posts = [];
                        for (i = 1; i <= 10000; i++) {
                            posts.push(new Post_1.Post(i, "Post #" + i));
                        }
                        return [4 /*yield*/, connection.manager.save(posts)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    })); });
});
//# sourceMappingURL=sqlite-bulk-save.js.map