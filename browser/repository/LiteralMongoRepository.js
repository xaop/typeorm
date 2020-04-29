import * as tslib_1 from "tslib";
import { createLiteralRepository } from "./LiteralRepository";
/**
 * Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
 */
export function createLiteralMongoRepository(_a) {
    var manager = _a.manager, target = _a.target, queryRunner = _a.queryRunner;
    return tslib_1.__assign({}, createLiteralRepository({ manager: manager, target: target, queryRunner: queryRunner }), { manager: manager, query: function (query, parameters) {
            throw new Error("Queries aren't supported by MongoDB.");
        },
        createQueryBuilder: function (alias, queryRunner) {
            throw new Error("Query Builder is not supported by MongoDB.");
        },
        find: function (optionsOrConditions) {
            return this.manager.find(this.getMetadata().target, optionsOrConditions);
        },
        findAndCount: function (optionsOrConditions) {
            return this.manager.findAndCount(this.getMetadata().target, optionsOrConditions);
        },
        findByIds: function (ids, optionsOrConditions) {
            return this.manager.findByIds(this.getMetadata().target, ids, optionsOrConditions);
        },
        findOne: function (optionsOrConditions, maybeOptions) {
            return this.manager.findOne(this.getMetadata().target, optionsOrConditions, maybeOptions);
        },
        createCursor: function (query) {
            return this.manager.createCursor(this.getMetadata().target, query);
        },
        createEntityCursor: function (query) {
            return this.manager.createEntityCursor(this.getMetadata().target, query);
        },
        aggregate: function (pipeline, options) {
            return this.manager.aggregate(this.getMetadata().target, pipeline, options);
        },
        aggregateEntity: function (pipeline, options) {
            return this.manager.aggregateEntity(this.getMetadata().target, pipeline, options);
        },
        bulkWrite: function (operations, options) {
            return this.manager.bulkWrite(this.getMetadata().target, operations, options);
        },
        count: function (query, options, mongoOptions) {
            return this.manager.count(this.getMetadata().target, query || {}, options, mongoOptions);
        },
        createCollectionIndex: function (fieldOrSpec, options) {
            return this.manager.createCollectionIndex(this.getMetadata().target, fieldOrSpec, options);
        },
        createCollectionIndexes: function (indexSpecs) {
            return this.manager.createCollectionIndexes(this.getMetadata().target, indexSpecs);
        },
        deleteMany: function (query, options) {
            return this.manager.deleteMany(this.getMetadata().tableName, query, options);
        },
        deleteOne: function (query, options) {
            return this.manager.deleteOne(this.getMetadata().tableName, query, options);
        },
        distinct: function (key, query, options) {
            return this.manager.distinct(this.getMetadata().tableName, key, query, options);
        },
        dropCollectionIndex: function (indexName, options) {
            return this.manager.dropCollectionIndex(this.getMetadata().tableName, indexName, options);
        },
        dropCollectionIndexes: function () {
            return this.manager.dropCollectionIndexes(this.getMetadata().tableName);
        },
        findOneAndDelete: function (query, options) {
            return this.manager.findOneAndDelete(this.getMetadata().tableName, query, options);
        },
        findOneAndReplace: function (query, replacement, options) {
            return this.manager.findOneAndReplace(this.getMetadata().tableName, query, replacement, options);
        },
        findOneAndUpdate: function (query, update, options) {
            return this.manager.findOneAndUpdate(this.getMetadata().tableName, query, update, options);
        },
        geoHaystackSearch: function (x, y, options) {
            return this.manager.geoHaystackSearch(this.getMetadata().tableName, x, y, options);
        },
        geoNear: function (x, y, options) {
            return this.manager.geoNear(this.getMetadata().tableName, x, y, options);
        },
        group: function (keys, condition, initial, reduce, finalize, command, options) {
            return this.manager.group(this.getMetadata().tableName, keys, condition, initial, reduce, finalize, command, options);
        },
        collectionIndexes: function () {
            return this.manager.collectionIndexes(this.getMetadata().tableName);
        },
        collectionIndexExists: function (indexes) {
            return this.manager.collectionIndexExists(this.getMetadata().tableName, indexes);
        },
        collectionIndexInformation: function (options) {
            return this.manager.collectionIndexInformation(this.getMetadata().tableName, options);
        },
        initializeOrderedBulkOp: function (options) {
            return this.manager.initializeOrderedBulkOp(this.getMetadata().tableName, options);
        },
        initializeUnorderedBulkOp: function (options) {
            return this.manager.initializeUnorderedBulkOp(this.getMetadata().tableName, options);
        },
        insertMany: function (docs, options) {
            return this.manager.insertMany(this.getMetadata().tableName, docs, options);
        },
        insertOne: function (doc, options) {
            return this.manager.insertOne(this.getMetadata().tableName, doc, options);
        },
        isCapped: function () {
            return this.manager.isCapped(this.getMetadata().tableName);
        },
        listCollectionIndexes: function (options) {
            return this.manager.listCollectionIndexes(this.getMetadata().tableName, options);
        },
        mapReduce: function (map, reduce, options) {
            return this.manager.mapReduce(this.getMetadata().tableName, map, reduce, options);
        },
        parallelCollectionScan: function (options) {
            return this.manager.parallelCollectionScan(this.getMetadata().tableName, options);
        },
        reIndex: function () {
            return this.manager.reIndex(this.getMetadata().tableName);
        },
        rename: function (newName, options) {
            return this.manager.rename(this.getMetadata().tableName, newName, options);
        },
        replaceOne: function (query, doc, options) {
            return this.manager.replaceOne(this.getMetadata().tableName, query, doc, options);
        },
        stats: function (options) {
            return this.manager.stats(this.getMetadata().tableName, options);
        },
        updateMany: function (query, update, options) {
            return this.manager.updateMany(this.getMetadata().tableName, query, update, options);
        },
        updateOne: function (query, update, options) {
            return this.manager.updateOne(this.getMetadata().tableName, query, update, options);
        } });
}

//# sourceMappingURL=LiteralMongoRepository.js.map
