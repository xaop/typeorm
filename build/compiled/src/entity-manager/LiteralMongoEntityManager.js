"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FindOptionsUtils_1 = require("../find-options/FindOptionsUtils");
var PlatformTools_1 = require("../platform/PlatformTools");
var DeleteResult_1 = require("../query-builder/result/DeleteResult");
var InsertResult_1 = require("../query-builder/result/InsertResult");
var UpdateResult_1 = require("../query-builder/result/UpdateResult");
var DocumentToEntityTransformer_1 = require("../query-builder/transformer/DocumentToEntityTransformer");
var BroadcasterResult_1 = require("../subscriber/BroadcasterResult");
var LiteralEntityManager_1 = require("./LiteralEntityManager");
/**
 * Entity manager supposed to work with any entity, automatically find its repository and call its methods,
 * whatever entity type are you passing.
 *
 * This implementation is used for MongoDB driver which has some specifics in its EntityManager.
 */
function createLiteralMongoEntityManager(_a) {
    var connection = _a.connection;
    function getQueryRunner() {
        return connection.driver.queryRunner;
    }
    /**
     * Overrides cursor's toArray and next methods to convert results to entity automatically.
     */
    function applyEntityTransformationToCursor(metadata, cursor) {
        var ParentCursor = PlatformTools_1.PlatformTools.load("mongodb").Cursor;
        cursor.toArray = function (callback) {
            if (callback) {
                ParentCursor.prototype.toArray.call(this, function (error, results) {
                    if (error) {
                        callback(error, results);
                        return;
                    }
                    var transformer = new DocumentToEntityTransformer_1.DocumentToEntityTransformer();
                    var entities = transformer.transformAll(results, metadata);
                    // broadcast "load" events
                    var broadcastResult = new BroadcasterResult_1.BroadcasterResult();
                    getQueryRunner().broadcaster.broadcastLoadEventsForAll(broadcastResult, metadata, entities);
                    Promise.all(broadcastResult.promises).then(function () { return callback(error, entities); });
                });
            }
            else {
                return ParentCursor.prototype.toArray.call(this).then(function (results) {
                    var transformer = new DocumentToEntityTransformer_1.DocumentToEntityTransformer();
                    var entities = transformer.transformAll(results, metadata);
                    // broadcast "load" events
                    var broadcastResult = new BroadcasterResult_1.BroadcasterResult();
                    getQueryRunner().broadcaster.broadcastLoadEventsForAll(broadcastResult, metadata, entities);
                    return Promise.all(broadcastResult.promises).then(function () { return entities; });
                });
            }
        };
        cursor.next = function (callback) {
            if (callback) {
                ParentCursor.prototype.next.call(this, function (error, result) {
                    if (error || !result) {
                        callback(error, result);
                        return;
                    }
                    var transformer = new DocumentToEntityTransformer_1.DocumentToEntityTransformer();
                    var entity = transformer.transform(result, metadata);
                    // broadcast "load" events
                    var broadcastResult = new BroadcasterResult_1.BroadcasterResult();
                    getQueryRunner().broadcaster.broadcastLoadEventsForAll(broadcastResult, metadata, [entity]);
                    Promise.all(broadcastResult.promises).then(function () { return callback(error, entity); });
                });
            }
            else {
                return ParentCursor.prototype.next.call(this).then(function (result) {
                    if (!result)
                        return result;
                    var transformer = new DocumentToEntityTransformer_1.DocumentToEntityTransformer();
                    var entity = transformer.transform(result, metadata);
                    // broadcast "load" events
                    var broadcastResult = new BroadcasterResult_1.BroadcasterResult();
                    getQueryRunner().broadcaster.broadcastLoadEventsForAll(broadcastResult, metadata, [entity]);
                    return Promise.all(broadcastResult.promises).then(function () { return entity; });
                });
            }
        };
    }
    /**
     * Converts FindOptions to mongodb query.
     */
    function convertFindOptionsOrConditionsToMongodbQuery(optionsOrConditions) {
        if (!optionsOrConditions)
            return undefined;
        if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions))
            return optionsOrConditions.where;
        return optionsOrConditions;
    }
    /**
     * Converts FindOneOptions to mongodb query.
     */
    function convertFindOneOptionsOrConditionsToMongodbQuery(optionsOrConditions) {
        if (!optionsOrConditions)
            return undefined;
        if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions))
            // If where condition is passed as a string which contains sql we have to ignore
            // as mongo is not a sql database
            return typeof optionsOrConditions.where === "string"
                ? {}
                : optionsOrConditions.where;
        return optionsOrConditions;
    }
    /**
     * Converts FindOptions into mongodb order by criteria.
     */
    function convertFindOptionsOrderToOrderCriteria(order) {
        return Object.keys(order).reduce(function (orderCriteria, key) {
            switch (order[key]) {
                case "DESC":
                    orderCriteria[key] = -1;
                    break;
                case "ASC":
                    orderCriteria[key] = 1;
                    break;
                default:
                    orderCriteria[key] = order[key];
            }
            return orderCriteria;
        }, {});
    }
    /**
     * Converts FindOptions into mongodb select by criteria.
     */
    function convertFindOptionsSelectToProjectCriteria(select) {
        if (select instanceof Array) {
            return select.reduce(function (projectCriteria, key) {
                projectCriteria[key] = 1;
                return projectCriteria;
            }, {});
        }
        else {
            return Object.keys(select).reduce(function (projectCriteria, key) {
                if (select[key] === true) {
                    projectCriteria[key] = 1;
                }
                // todo: do we need to make this recursive?
                return projectCriteria;
            }, {});
        }
    }
    /**
     * Ensures given id is an id for query.
     */
    function convertMixedCriteria(metadata, idMap) {
        if (idMap instanceof Object) {
            return metadata.columns.reduce(function (query, column) {
                var columnValue = column.getEntityValue(idMap);
                if (columnValue !== undefined)
                    query[column.databasePath] = columnValue;
                return query;
            }, {});
        }
        // means idMap is just object id
        var objectIdInstance = PlatformTools_1.PlatformTools.load("mongodb").ObjectID;
        return {
            "_id": (idMap instanceof objectIdInstance) ? idMap : new objectIdInstance(idMap)
        };
    }
    return tslib_1.__assign({}, LiteralEntityManager_1.createLiteralEntityManager({ connection: connection }), { connection: connection, get queryRunner() {
            return getQueryRunner();
        }, typeof: "MongoEntityManager", // todo: fix as any
        // -------------------------------------------------------------------------
        // Overridden Methods
        // -------------------------------------------------------------------------
        find: function (entityClassOrName, optionsOrConditions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var query, cursor;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = convertFindOptionsOrConditionsToMongodbQuery(optionsOrConditions);
                            return [4 /*yield*/, this.createEntityCursor(entityClassOrName, query)];
                        case 1:
                            cursor = _a.sent();
                            if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions)) {
                                if (optionsOrConditions.select)
                                    cursor.project(convertFindOptionsSelectToProjectCriteria(optionsOrConditions.select));
                                if (optionsOrConditions.skip)
                                    cursor.skip(optionsOrConditions.skip);
                                if (optionsOrConditions.take)
                                    cursor.limit(optionsOrConditions.take);
                                if (optionsOrConditions.order)
                                    cursor.sort(convertFindOptionsOrderToOrderCriteria(optionsOrConditions.order));
                            }
                            return [2 /*return*/, cursor.toArray()];
                    }
                });
            });
        },
        findAndCount: function (entityClassOrName, optionsOrConditions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var query, cursor, _a, results, count;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            query = convertFindOptionsOrConditionsToMongodbQuery(optionsOrConditions);
                            return [4 /*yield*/, this.createEntityCursor(entityClassOrName, query)];
                        case 1:
                            cursor = _b.sent();
                            if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions)) {
                                if (optionsOrConditions.select)
                                    cursor.project(convertFindOptionsSelectToProjectCriteria(optionsOrConditions.select));
                                if (optionsOrConditions.skip)
                                    cursor.skip(optionsOrConditions.skip);
                                if (optionsOrConditions.take)
                                    cursor.limit(optionsOrConditions.take);
                                if (optionsOrConditions.order)
                                    cursor.sort(convertFindOptionsOrderToOrderCriteria(optionsOrConditions.order));
                            }
                            return [4 /*yield*/, Promise.all([
                                    cursor.toArray(),
                                    this.count(entityClassOrName, query),
                                ])];
                        case 2:
                            _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), results = _a[0], count = _a[1];
                            return [2 /*return*/, [results, parseInt(count)]];
                    }
                });
            });
        },
        findByIds: function (entityClassOrName, ids, optionsOrConditions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, query, objectIdInstance, cursor;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            metadata = connection.getMetadata(entityClassOrName);
                            query = convertFindOptionsOrConditionsToMongodbQuery(optionsOrConditions) || {};
                            objectIdInstance = PlatformTools_1.PlatformTools.load("mongodb").ObjectID;
                            query["_id"] = {
                                $in: ids.map(function (id) {
                                    if (id instanceof objectIdInstance)
                                        return id;
                                    return id[metadata.objectIdColumn.propertyName];
                                })
                            };
                            return [4 /*yield*/, this.createEntityCursor(entityClassOrName, query)];
                        case 1:
                            cursor = _a.sent();
                            if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions)) {
                                if (optionsOrConditions.select)
                                    cursor.project(convertFindOptionsSelectToProjectCriteria(optionsOrConditions.select));
                                if (optionsOrConditions.skip)
                                    cursor.skip(optionsOrConditions.skip);
                                if (optionsOrConditions.take)
                                    cursor.limit(optionsOrConditions.take);
                                if (optionsOrConditions.order)
                                    cursor.sort(convertFindOptionsOrderToOrderCriteria(optionsOrConditions.order));
                            }
                            return [4 /*yield*/, cursor.toArray()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        findOne: function (entityClassOrName, optionsOrConditions, maybeOptions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var objectIdInstance, id, findOneOptionsOrConditions, query, cursor, result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            objectIdInstance = PlatformTools_1.PlatformTools.load("mongodb").ObjectID;
                            id = (optionsOrConditions instanceof objectIdInstance) || typeof optionsOrConditions === "string" ? optionsOrConditions : undefined;
                            findOneOptionsOrConditions = (id ? maybeOptions : optionsOrConditions);
                            query = convertFindOneOptionsOrConditionsToMongodbQuery(findOneOptionsOrConditions) || {};
                            if (id) {
                                query["_id"] = (id instanceof objectIdInstance) ? id : new objectIdInstance(id);
                            }
                            return [4 /*yield*/, this.createEntityCursor(entityClassOrName, query)];
                        case 1:
                            cursor = _a.sent();
                            if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(findOneOptionsOrConditions)) {
                                if (findOneOptionsOrConditions.select)
                                    cursor.project(convertFindOptionsSelectToProjectCriteria(findOneOptionsOrConditions.select));
                                if (findOneOptionsOrConditions.order)
                                    cursor.sort(convertFindOptionsOrderToOrderCriteria(findOneOptionsOrConditions.order));
                            }
                            return [4 /*yield*/, cursor.limit(1).toArray()];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.length > 0 ? result[0] : undefined];
                    }
                });
            });
        },
        insert: function (target, entity) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, _a, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            result = new InsertResult_1.InsertResult();
                            if (!(entity instanceof Array)) return [3 /*break*/, 2];
                            _a = result;
                            return [4 /*yield*/, this.insertMany(target, entity)];
                        case 1:
                            _a.raw = _c.sent();
                            Object.keys(result.raw.insertedIds).forEach(function (key) {
                                var insertedId = result.raw.insertedIds[key];
                                result.generatedMaps.push(connection.driver.createGeneratedMap(connection.getMetadata(target), insertedId));
                                result.identifiers.push(connection.driver.createGeneratedMap(connection.getMetadata(target), insertedId));
                            });
                            return [3 /*break*/, 4];
                        case 2:
                            _b = result;
                            return [4 /*yield*/, this.insertOne(target, entity)];
                        case 3:
                            _b.raw = _c.sent();
                            result.generatedMaps.push(connection.driver.createGeneratedMap(connection.getMetadata(target), result.raw.insertedId));
                            result.identifiers.push(connection.driver.createGeneratedMap(connection.getMetadata(target), result.raw.insertedId));
                            _c.label = 4;
                        case 4: return [2 /*return*/, result];
                    }
                });
            });
        },
        update: function (target, criteria, partialEntity) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                var metadata;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(criteria instanceof Array)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.all(criteria.map(function (criteriaItem) {
                                    return _this.update(target, criteriaItem, partialEntity);
                                }))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            metadata = connection.getMetadata(target);
                            return [4 /*yield*/, this.updateOne(target, convertMixedCriteria(metadata, criteria), { $set: partialEntity })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, new UpdateResult_1.UpdateResult()];
                    }
                });
            });
        },
        delete: function (target, criteria) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(criteria instanceof Array)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.all(criteria.map(function (criteriaItem) {
                                    return _this.delete(target, criteriaItem);
                                }))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.deleteOne(target, convertMixedCriteria(connection.getMetadata(target), criteria))];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, new DeleteResult_1.DeleteResult()];
                    }
                });
            });
        },
        // -------------------------------------------------------------------------
        // Public Methods
        // -------------------------------------------------------------------------
        createCursor: function (entityClassOrName, query) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().cursor(metadata.tableName, query);
        },
        createEntityCursor: function (entityClassOrName, query) {
            var metadata = connection.getMetadata(entityClassOrName);
            var cursor = this.createCursor(entityClassOrName, query);
            applyEntityTransformationToCursor(metadata, cursor);
            return cursor;
        },
        aggregate: function (entityClassOrName, pipeline, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().aggregate(metadata.tableName, pipeline, options);
        },
        aggregateEntity: function (entityClassOrName, pipeline, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            var cursor = getQueryRunner().aggregate(metadata.tableName, pipeline, options);
            applyEntityTransformationToCursor(metadata, cursor);
            return cursor;
        },
        bulkWrite: function (entityClassOrName, operations, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().bulkWrite(metadata.tableName, operations, options);
        },
        count: function (entityClassOrName, query, options, mongoOptions) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().count(metadata.tableName, query, mongoOptions);
        },
        createCollectionIndex: function (entityClassOrName, fieldOrSpec, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().createCollectionIndex(metadata.tableName, fieldOrSpec, options);
        },
        createCollectionIndexes: function (entityClassOrName, indexSpecs) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().createCollectionIndexes(metadata.tableName, indexSpecs);
        },
        deleteMany: function (entityClassOrName, query, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().deleteMany(metadata.tableName, query, options);
        },
        deleteOne: function (entityClassOrName, query, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().deleteOne(metadata.tableName, query, options);
        },
        distinct: function (entityClassOrName, key, query, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().distinct(metadata.tableName, key, query, options);
        },
        dropCollectionIndex: function (entityClassOrName, indexName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().dropCollectionIndex(metadata.tableName, indexName, options);
        },
        dropCollectionIndexes: function (entityClassOrName) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().dropCollectionIndexes(metadata.tableName);
        },
        findOneAndDelete: function (entityClassOrName, query, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().findOneAndDelete(metadata.tableName, query, options);
        },
        findOneAndReplace: function (entityClassOrName, query, replacement, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().findOneAndReplace(metadata.tableName, query, replacement, options);
        },
        findOneAndUpdate: function (entityClassOrName, query, update, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().findOneAndUpdate(metadata.tableName, query, update, options);
        },
        geoHaystackSearch: function (entityClassOrName, x, y, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().geoHaystackSearch(metadata.tableName, x, y, options);
        },
        geoNear: function (entityClassOrName, x, y, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().geoNear(metadata.tableName, x, y, options);
        },
        group: function (entityClassOrName, keys, condition, initial, reduce, finalize, command, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().group(metadata.tableName, keys, condition, initial, reduce, finalize, command, options);
        },
        collectionIndexes: function (entityClassOrName) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().collectionIndexes(metadata.tableName);
        },
        collectionIndexExists: function (entityClassOrName, indexes) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().collectionIndexExists(metadata.tableName, indexes);
        },
        collectionIndexInformation: function (entityClassOrName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().collectionIndexInformation(metadata.tableName, options);
        },
        initializeOrderedBulkOp: function (entityClassOrName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().initializeOrderedBulkOp(metadata.tableName, options);
        },
        initializeUnorderedBulkOp: function (entityClassOrName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().initializeUnorderedBulkOp(metadata.tableName, options);
        },
        insertMany: function (entityClassOrName, docs, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().insertMany(metadata.tableName, docs, options);
        },
        insertOne: function (entityClassOrName, doc, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().insertOne(metadata.tableName, doc, options);
        },
        isCapped: function (entityClassOrName) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().isCapped(metadata.tableName);
        },
        listCollectionIndexes: function (entityClassOrName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().listCollectionIndexes(metadata.tableName, options);
        },
        mapReduce: function (entityClassOrName, map, reduce, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().mapReduce(metadata.tableName, map, reduce, options);
        },
        parallelCollectionScan: function (entityClassOrName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().parallelCollectionScan(metadata.tableName, options);
        },
        reIndex: function (entityClassOrName) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().reIndex(metadata.tableName);
        },
        rename: function (entityClassOrName, newName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().rename(metadata.tableName, newName, options);
        },
        replaceOne: function (entityClassOrName, query, doc, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().replaceOne(metadata.tableName, query, doc, options);
        },
        stats: function (entityClassOrName, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().stats(metadata.tableName, options);
        },
        watch: function (entityClassOrName, pipeline, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().watch(metadata.tableName, pipeline, options);
        },
        updateMany: function (entityClassOrName, query, update, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().updateMany(metadata.tableName, query, update, options);
        },
        updateOne: function (entityClassOrName, query, update, options) {
            var metadata = connection.getMetadata(entityClassOrName);
            return getQueryRunner().updateOne(metadata.tableName, query, update, options);
        } });
}
exports.createLiteralMongoEntityManager = createLiteralMongoEntityManager;
//# sourceMappingURL=LiteralMongoEntityManager.js.map