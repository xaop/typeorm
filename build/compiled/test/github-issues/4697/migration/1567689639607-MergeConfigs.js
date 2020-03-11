"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var item_entity_1 = require("../entity/item.entity");
var config_entity_1 = require("../entity/config.entity");
var MergeConfigs1567689639607 = /** @class */ (function () {
    function MergeConfigs1567689639607() {
    }
    MergeConfigs1567689639607.prototype.up = function (_a) {
        var connection = _a.connection;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemRepository, configRepository, configs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemRepository = connection.getMongoRepository(item_entity_1.Item);
                        configRepository = connection.getMongoRepository(config_entity_1.Config);
                        return [4 /*yield*/, configRepository.find()];
                    case 1:
                        configs = _a.sent();
                        return [4 /*yield*/, Promise.all(configs.map(function (_a) {
                                var itemId = _a.itemId, data = _a.data;
                                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var item;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, itemRepository.findOne(itemId)];
                                            case 1:
                                                item = _a.sent();
                                                if (item) {
                                                    item.config = data;
                                                    return [2 /*return*/, itemRepository.save(item)];
                                                }
                                                else {
                                                    console.warn("No item found with id: " + itemId + ". Ignoring.");
                                                    return [2 /*return*/, null];
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MergeConfigs1567689639607.prototype.down = function (_a) {
        var connection = _a.connection;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var itemRepository, configRepository, items;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemRepository = connection.getRepository(item_entity_1.Item);
                        configRepository = connection.getRepository(config_entity_1.Config);
                        return [4 /*yield*/, itemRepository.find()];
                    case 1:
                        items = _a.sent();
                        return [4 /*yield*/, Promise.all(items.map(function (item) {
                                var config = new config_entity_1.Config();
                                config.itemId = item._id.toString();
                                config.data = item.config;
                                return configRepository.save(config);
                            }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MergeConfigs1567689639607;
}());
exports.MergeConfigs1567689639607 = MergeConfigs1567689639607;
//# sourceMappingURL=1567689639607-MergeConfigs.js.map