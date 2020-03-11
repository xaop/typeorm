"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var item_entity_1 = require("../entity/item.entity");
var UpdateContacts1566560354098 = /** @class */ (function () {
    function UpdateContacts1566560354098() {
    }
    UpdateContacts1566560354098.prototype.up = function (_a) {
        var connection = _a.connection;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var repo, items;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = connection.getMongoRepository(item_entity_1.Item);
                        return [4 /*yield*/, repo.find()];
                    case 1:
                        items = _a.sent();
                        items.forEach(function (item) {
                            if (!item.contacts) {
                                item.contacts = [item.contact || ""];
                            }
                        });
                        return [4 /*yield*/, repo.save(items)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UpdateContacts1566560354098.prototype.down = function (_a) {
        var connection = _a.connection;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var repo, items;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = connection.getMongoRepository(item_entity_1.Item);
                        return [4 /*yield*/, repo.find()];
                    case 1:
                        items = _a.sent();
                        items.forEach(function (item) {
                            item.contact = item.contacts[0];
                        });
                        return [4 /*yield*/, repo.save(items)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UpdateContacts1566560354098;
}());
exports.UpdateContacts1566560354098 = UpdateContacts1566560354098;
//# sourceMappingURL=1566560354098-UpdateContacts.js.map