"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MongoDriver_1 = require("../driver/mongodb/MongoDriver");
var OracleDriver_1 = require("../driver/oracle/OracleDriver");
var CustomRepositoryCannotInheritRepositoryError_1 = require("../error/CustomRepositoryCannotInheritRepositoryError");
var CustomRepositoryNotFoundError_1 = require("../error/CustomRepositoryNotFoundError");
var EntityNotFoundError_1 = require("../error/EntityNotFoundError");
var NoNeedToReleaseEntityManagerError_1 = require("../error/NoNeedToReleaseEntityManagerError");
var QueryRunnerProviderAlreadyReleasedError_1 = require("../error/QueryRunnerProviderAlreadyReleasedError");
var TreeRepositoryNotSupportedError_1 = require("../error/TreeRepositoryNotSupportedError");
var FindOptionsUtils_1 = require("../find-options/FindOptionsUtils");
var index_1 = require("../index");
var ObserverExecutor_1 = require("../observer/ObserverExecutor");
var QueryObserver_1 = require("../observer/QueryObserver");
var EntityPersistExecutor_1 = require("../persistence/EntityPersistExecutor");
var PlainObjectToDatabaseEntityTransformer_1 = require("../query-builder/transformer/PlainObjectToDatabaseEntityTransformer");
var PlainObjectToNewEntityTransformer_1 = require("../query-builder/transformer/PlainObjectToNewEntityTransformer");
var AbstractRepository_1 = require("../repository/AbstractRepository");
var ObjectUtils_1 = require("../util/ObjectUtils");
var LiteralTreeRepository_1 = require("../repository/LiteralTreeRepository");
var LiteralMongoRepository_1 = require("../repository/LiteralMongoRepository");
var LiteralRepository_1 = require("../repository/LiteralRepository");
/**
 * Entity manager supposed to work with any entity, automatically find its repository and call its methods,
 * whatever entity type are you passing.
 */
function createLiteralEntityManager(_a) {
    var connection = _a.connection, queryRunner = _a.queryRunner;
    /**
     * Once created and then reused by repositories.
     */
    var repositories = [];
    /**
     * Once created and then reused by repositories.
     */
    var treeRepositories = [];
    /**
     * Plain to object transformer used in create and merge operations.
     */
    var plainObjectToEntityTransformer = new PlainObjectToNewEntityTransformer_1.PlainObjectToNewEntityTransformer();
    var manager = {
        typeof: "EntityManager",
        connection: connection,
        queryRunner: queryRunner,
        transaction: function (isolationOrRunInTransaction, runInTransactionParam) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var isolation, runInTransaction, queryRunner, result, err_1, rollbackError_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            isolation = typeof isolationOrRunInTransaction === "string" ? isolationOrRunInTransaction : undefined;
                            runInTransaction = typeof isolationOrRunInTransaction === "function" ? isolationOrRunInTransaction : runInTransactionParam;
                            if (!runInTransaction) {
                                throw new Error("Transaction method requires callback in second paramter if isolation level is supplied.");
                            }
                            if (this.connection.driver instanceof MongoDriver_1.MongoDriver)
                                throw new Error("Transactions aren't supported by MongoDB.");
                            if (this.queryRunner && this.queryRunner.isReleased)
                                throw new QueryRunnerProviderAlreadyReleasedError_1.QueryRunnerProviderAlreadyReleasedError();
                            if (this.queryRunner && this.queryRunner.isTransactionActive)
                                throw new Error("Cannot start transaction because its already started");
                            queryRunner = this.queryRunner || this.connection.createQueryRunner("master");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 9, 14, 17]);
                            if (!isolation) return [3 /*break*/, 3];
                            return [4 /*yield*/, queryRunner.startTransaction(isolation)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, queryRunner.startTransaction()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, runInTransaction(queryRunner.manager)];
                        case 6:
                            result = _a.sent();
                            return [4 /*yield*/, queryRunner.commitTransaction()];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, new ObserverExecutor_1.ObserverExecutor(this.connection.observers).execute()];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, result];
                        case 9:
                            err_1 = _a.sent();
                            _a.label = 10;
                        case 10:
                            _a.trys.push([10, 12, , 13]);
                            return [4 /*yield*/, queryRunner.rollbackTransaction()];
                        case 11:
                            _a.sent();
                            return [3 /*break*/, 13];
                        case 12:
                            rollbackError_1 = _a.sent();
                            return [3 /*break*/, 13];
                        case 13: throw err_1;
                        case 14:
                            if (!!this.queryRunner) return [3 /*break*/, 16];
                            return [4 /*yield*/, queryRunner.release()];
                        case 15:
                            _a.sent();
                            _a.label = 16;
                        case 16: return [7 /*endfinally*/];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        },
        query: function (query, parameters) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.connection.query(query, parameters, this.queryRunner)];
                });
            });
        },
        createQueryBuilder: function (entityClass, alias, queryRunner) {
            if (alias) {
                return this.connection.createQueryBuilder(entityClass, alias, queryRunner || this.queryRunner);
            }
            else {
                return this.connection.createQueryBuilder(entityClass || queryRunner || this.queryRunner);
            }
        },
        hasId: function (targetOrEntity, maybeEntity) {
            var target = arguments.length === 2 ? targetOrEntity : targetOrEntity.constructor;
            var entity = arguments.length === 2 ? maybeEntity : targetOrEntity;
            var metadata = this.connection.getMetadata(target);
            return metadata.hasId(entity);
        },
        getId: function (targetOrEntity, maybeEntity) {
            var target = arguments.length === 2 ? targetOrEntity : targetOrEntity.constructor;
            var entity = arguments.length === 2 ? maybeEntity : targetOrEntity;
            var metadata = this.connection.getMetadata(target);
            return metadata.getEntityIdMixedMap(entity);
        },
        create: function (entityClass, plainObjectOrObjects) {
            var _this = this;
            var metadata = this.connection.getMetadata(entityClass);
            if (!plainObjectOrObjects)
                return metadata.create(this.queryRunner);
            if (plainObjectOrObjects instanceof Array)
                return plainObjectOrObjects.map(function (plainEntityLike) { return _this.create(entityClass, plainEntityLike); });
            var mergeIntoEntity = metadata.create(this.queryRunner);
            plainObjectToEntityTransformer.transform(mergeIntoEntity, plainObjectOrObjects, metadata, true);
            return mergeIntoEntity;
        },
        merge: function (entityClass, mergeIntoEntity) {
            var entityLikes = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                entityLikes[_i - 2] = arguments[_i];
            }
            var metadata = this.connection.getMetadata(entityClass);
            entityLikes.forEach(function (object) { return plainObjectToEntityTransformer.transform(mergeIntoEntity, object, metadata); });
            return mergeIntoEntity;
        },
        preload: function (entityClass, entityLike) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, plainObjectToDatabaseEntityTransformer, transformedEntity;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            metadata = this.connection.getMetadata(entityClass);
                            plainObjectToDatabaseEntityTransformer = new PlainObjectToDatabaseEntityTransformer_1.PlainObjectToDatabaseEntityTransformer(this.connection.manager);
                            return [4 /*yield*/, plainObjectToDatabaseEntityTransformer.transform(entityLike, metadata)];
                        case 1:
                            transformedEntity = _a.sent();
                            if (transformedEntity)
                                return [2 /*return*/, this.merge(entityClass, transformedEntity, entityLike)];
                            return [2 /*return*/, undefined];
                    }
                });
            });
        },
        save: function (targetOrEntity, maybeEntityOrOptions, maybeOptions) {
            // normalize mixed parameters
            var target = (arguments.length > 1 && (targetOrEntity instanceof Function || targetOrEntity instanceof index_1.EntitySchema || typeof targetOrEntity === "string")) ? targetOrEntity : undefined;
            var entity = target ? maybeEntityOrOptions : targetOrEntity;
            var options = target ? maybeOptions : maybeEntityOrOptions;
            if (target instanceof index_1.EntitySchema)
                target = target.options.name;
            // if user passed empty array of entities then we don't need to do anything
            if (entity instanceof Array && entity.length === 0)
                return Promise.resolve(entity);
            // execute save operation
            return new EntityPersistExecutor_1.EntityPersistExecutor(this.connection, this.queryRunner, "save", target, entity, options)
                .execute()
                .then(function () { return entity; });
        },
        remove: function (targetOrEntity, maybeEntityOrOptions, maybeOptions) {
            // normalize mixed parameters
            var target = (arguments.length > 1 && (targetOrEntity instanceof Function || typeof targetOrEntity === "string")) ? targetOrEntity : undefined;
            var entity = target ? maybeEntityOrOptions : targetOrEntity;
            var options = target ? maybeOptions : maybeEntityOrOptions;
            // if user passed empty array of entities then we don't need to do anything
            if (entity instanceof Array && entity.length === 0)
                return Promise.resolve(entity);
            // execute save operation
            return new EntityPersistExecutor_1.EntityPersistExecutor(this.connection, this.queryRunner, "remove", target, entity, options)
                .execute()
                .then(function () { return entity; });
        },
        insert: function (target, entity) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                var results;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.connection.driver instanceof OracleDriver_1.OracleDriver && entity instanceof Array)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.all(entity.map(function (entity) { return _this.insert(target, entity); }))];
                        case 1:
                            results = _a.sent();
                            return [2 /*return*/, results.reduce(function (mergedResult, result) { return Object.assign(mergedResult, result); }, {})];
                        case 2: return [2 /*return*/, this.createQueryBuilder()
                                .insert()
                                .into(target)
                                .values(entity)
                                .execute()];
                    }
                });
            });
        },
        update: function (target, criteria, partialEntity) {
            // if user passed empty criteria or empty list of criterias, then throw an error
            if (criteria === undefined ||
                criteria === null ||
                criteria === "" ||
                (criteria instanceof Array && criteria.length === 0)) {
                return Promise.reject(new Error("Empty criteria(s) are not allowed for the update method."));
            }
            if (typeof criteria === "string" ||
                typeof criteria === "number" ||
                criteria instanceof Date ||
                criteria instanceof Array) {
                return this.createQueryBuilder()
                    .update(target)
                    .set(partialEntity)
                    .whereInIds(criteria)
                    .execute();
            }
            else {
                return this.createQueryBuilder()
                    .update(target)
                    .set(partialEntity)
                    .where(criteria)
                    .execute();
            }
        },
        delete: function (targetOrEntity, criteria) {
            // if user passed empty criteria or empty list of criterias, then throw an error
            if (criteria === undefined ||
                criteria === null ||
                criteria === "" ||
                (criteria instanceof Array && criteria.length === 0)) {
                return Promise.reject(new Error("Empty criteria(s) are not allowed for the delete method."));
            }
            if (typeof criteria === "string" ||
                typeof criteria === "number" ||
                criteria instanceof Date ||
                criteria instanceof Array) {
                return this.createQueryBuilder()
                    .delete()
                    .from(targetOrEntity)
                    .whereInIds(criteria)
                    .execute();
            }
            else {
                return this.createQueryBuilder()
                    .delete()
                    .from(targetOrEntity)
                    .where(criteria)
                    .execute();
            }
        },
        count: function (entityClass, conditions, options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, qb;
                return tslib_1.__generator(this, function (_a) {
                    metadata = this.connection.getMetadata(entityClass);
                    qb = this.createQueryBuilder(entityClass, metadata.name);
                    qb.setFindOptions({
                        where: conditions,
                        options: options
                    });
                    return [2 /*return*/, qb.getCount()];
                });
            });
        },
        find: function (entityClass, optionsOrConditions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, qb;
                return tslib_1.__generator(this, function (_a) {
                    metadata = this.connection.getMetadata(entityClass);
                    qb = this.createQueryBuilder(entityClass, metadata.name);
                    if (optionsOrConditions)
                        qb.setFindOptions(FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions) ? optionsOrConditions : { where: optionsOrConditions });
                    return [2 /*return*/, qb.getMany()];
                });
            });
        },
        findAndCount: function (entityClass, optionsOrConditions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, qb;
                return tslib_1.__generator(this, function (_a) {
                    metadata = this.connection.getMetadata(entityClass);
                    qb = this.createQueryBuilder(entityClass, metadata.name);
                    if (optionsOrConditions)
                        qb.setFindOptions(FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions) ? optionsOrConditions : { where: optionsOrConditions });
                    return [2 /*return*/, qb.getManyAndCount()];
                });
            });
        },
        findByIds: function (entityClass, ids, optionsOrConditions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, qb, findOptions;
                return tslib_1.__generator(this, function (_a) {
                    // if no ids passed, no need to execute a query - just return an empty array of values
                    if (!ids.length)
                        return [2 /*return*/, Promise.resolve([])];
                    metadata = this.connection.getMetadata(entityClass);
                    qb = this.createQueryBuilder(entityClass, metadata.name);
                    findOptions = {};
                    if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(optionsOrConditions)) {
                        Object.assign(findOptions, optionsOrConditions);
                    }
                    else if (optionsOrConditions) {
                        Object.assign(findOptions, { where: optionsOrConditions });
                    }
                    // if (findOptions.where || metadata.primaryColumns.length > 1) {
                    return [2 /*return*/, qb
                            .setFindOptions(findOptions)
                            .andWhereInIds(ids)
                            .getMany()];
                });
            });
        },
        findOne: function (entityClass, idOrOptionsOrConditions, maybeOptions) {
            var findOptions = undefined;
            if (FindOptionsUtils_1.FindOptionsUtils.isFindOptions(idOrOptionsOrConditions)) {
                findOptions = idOrOptionsOrConditions;
            }
            else if (maybeOptions && FindOptionsUtils_1.FindOptionsUtils.isFindOptions(maybeOptions)) {
                findOptions = maybeOptions;
            }
            var options = undefined;
            if (idOrOptionsOrConditions instanceof Object && !FindOptionsUtils_1.FindOptionsUtils.isFindOptions(idOrOptionsOrConditions))
                options = idOrOptionsOrConditions;
            var metadata = this.connection.getMetadata(entityClass);
            var qb = this.createQueryBuilder(entityClass, metadata.name);
            // if (!findOptions || findOptions.loadEagerRelations !== false)
            //     FindOptionsUtils.joinEagerRelations(qb, qb.alias, qb.expressionMap.mainAlias!.metadata);
            if (findOptions) {
                findOptions = tslib_1.__assign({}, (findOptions || {}), { take: 1 });
                qb.setFindOptions(findOptions);
            }
            if (options) {
                qb.where(options);
            }
            else if (typeof idOrOptionsOrConditions === "string" || typeof idOrOptionsOrConditions === "number" || idOrOptionsOrConditions instanceof Date) {
                qb.andWhereInIds(metadata.ensureEntityIdMap(idOrOptionsOrConditions));
            }
            return qb.getOne();
        },
        findOneOrFail: function (entityClass, idOrOptionsOrConditions, maybeOptions) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.findOne(entityClass, idOrOptionsOrConditions, maybeOptions).then(function (value) {
                            if (value === undefined) {
                                return Promise.reject(new EntityNotFoundError_1.EntityNotFoundError(entityClass, idOrOptionsOrConditions));
                            }
                            return Promise.resolve(value);
                        })];
                });
            });
        },
        observe: function (entityClass, optionsOrConditions) {
            var metadata = this.connection.getMetadata(entityClass);
            return new QueryObserver_1.QueryObserver(this.connection, "find", metadata, optionsOrConditions).observe();
        },
        observeManyAndCount: function (entityClass, optionsOrConditions) {
            var metadata = this.connection.getMetadata(entityClass);
            return new QueryObserver_1.QueryObserver(this.connection, "findAndCount", metadata, optionsOrConditions).observe();
        },
        observeOne: function (entityClass, optionsOrConditions) {
            var metadata = this.connection.getMetadata(entityClass);
            return new QueryObserver_1.QueryObserver(this.connection, "findOne", metadata, optionsOrConditions).observe();
        },
        observeCount: function (entityClass, optionsOrConditions) {
            var metadata = this.connection.getMetadata(entityClass);
            return new QueryObserver_1.QueryObserver(this.connection, "count", metadata, optionsOrConditions).observe();
        },
        clear: function (entityClass) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var metadata, queryRunner;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            metadata = this.connection.getMetadata(entityClass);
                            queryRunner = this.queryRunner || this.connection.createQueryRunner("master");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 6]);
                            return [4 /*yield*/, queryRunner.clearTable(metadata.tablePath)];
                        case 2: return [2 /*return*/, _a.sent()]; // await is needed here because we are using finally
                        case 3:
                            if (!!this.queryRunner) return [3 /*break*/, 5];
                            return [4 /*yield*/, queryRunner.release()];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        increment: function (entityClass, conditions, propertyPath, value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                var metadata, column, values;
                return tslib_1.__generator(this, function (_a) {
                    metadata = this.connection.getMetadata(entityClass);
                    column = metadata.findColumnWithPropertyPath(propertyPath);
                    if (!column)
                        throw new Error("Column " + propertyPath + " was not found in " + metadata.targetName + " entity.");
                    if (isNaN(Number(value)))
                        throw new Error("Value \"" + value + "\" is not a number.");
                    values = propertyPath
                        .split(".")
                        .reduceRight(function (value, key) {
                        return (_a = {}, _a[key] = value, _a);
                        var _a;
                    }, function () { return _this.connection.driver.escape(column.databaseName) + " + " + value; });
                    return [2 /*return*/, this
                            .createQueryBuilder(entityClass, "entity")
                            .update(entityClass)
                            .set(values)
                            .where(conditions)
                            .execute()];
                });
            });
        },
        decrement: function (entityClass, conditions, propertyPath, value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                var metadata, column, values;
                return tslib_1.__generator(this, function (_a) {
                    metadata = this.connection.getMetadata(entityClass);
                    column = metadata.findColumnWithPropertyPath(propertyPath);
                    if (!column)
                        throw new Error("Column " + propertyPath + " was not found in " + metadata.targetName + " entity.");
                    if (isNaN(Number(value)))
                        throw new Error("Value \"" + value + "\" is not a number.");
                    values = propertyPath
                        .split(".")
                        .reduceRight(function (value, key) {
                        return (_a = {}, _a[key] = value, _a);
                        var _a;
                    }, function () { return _this.connection.driver.escape(column.databaseName) + " - " + value; });
                    return [2 /*return*/, this
                            .createQueryBuilder(entityClass, "entity")
                            .update(entityClass)
                            .set(values)
                            .where(conditions)
                            .execute()];
                });
            });
        },
        getRepository: function (target) {
            // find already created repository instance and return it if found
            var repository = repositories.find(function (repository) { return repository.target === target; });
            if (repository)
                return repository;
            // if repository was not found then create it, store its instance and return it
            if (this.connection.driver instanceof MongoDriver_1.MongoDriver) {
                var newRepository = LiteralMongoRepository_1.createLiteralMongoRepository({
                    manager: this,
                    target: target,
                    queryRunner: this.queryRunner,
                });
                repositories.push(newRepository);
                return newRepository;
            }
            else {
                var newRepository = LiteralRepository_1.createLiteralRepository({
                    manager: this,
                    target: target,
                    queryRunner: this.queryRunner,
                });
                repositories.push(newRepository);
                return newRepository;
            }
        },
        getTreeRepository: function (target) {
            // tree tables aren't supported by some drivers (mongodb)
            if (this.connection.driver.treeSupport === false)
                throw new TreeRepositoryNotSupportedError_1.TreeRepositoryNotSupportedError(this.connection.driver);
            // find already created repository instance and return it if found
            var repository = treeRepositories.find(function (repository) { return repository.target === target; });
            if (repository)
                return repository;
            // check if repository is real tree repository
            var newRepository = LiteralTreeRepository_1.createLiteralTreeRepository({
                manager: this,
                target: target,
                queryRunner: this.queryRunner,
            });
            treeRepositories.push(newRepository);
            return newRepository;
        },
        getMongoRepository: function (target) {
            return connection.getMongoRepository(target);
        },
        getCustomRepository: function (customRepository) {
            var entityRepositoryMetadataArgs = index_1.getMetadataArgsStorage().entityRepositories.find(function (repository) {
                return repository.target === (customRepository instanceof Function ? customRepository : customRepository.constructor);
            });
            if (!entityRepositoryMetadataArgs)
                throw new CustomRepositoryNotFoundError_1.CustomRepositoryNotFoundError(customRepository);
            var entityMetadata = entityRepositoryMetadataArgs.entity ? this.connection.getMetadata(entityRepositoryMetadataArgs.entity) : undefined;
            var entityRepositoryInstance = new entityRepositoryMetadataArgs.target(this, entityMetadata);
            // NOTE: dynamic access to protected properties. We need this to prevent unwanted properties in those classes to be exposed,
            // however we need these properties for internal work of the class
            if (entityRepositoryInstance instanceof AbstractRepository_1.AbstractRepository) {
                if (!entityRepositoryInstance["manager"])
                    entityRepositoryInstance["manager"] = this;
            }
            else {
                if (!entityMetadata)
                    throw new CustomRepositoryCannotInheritRepositoryError_1.CustomRepositoryCannotInheritRepositoryError(customRepository);
                entityRepositoryInstance["manager"] = this;
                entityRepositoryInstance["metadata"] = entityMetadata;
            }
            return entityRepositoryInstance;
        },
        release: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (!this.queryRunner)
                        throw new NoNeedToReleaseEntityManagerError_1.NoNeedToReleaseEntityManagerError();
                    return [2 /*return*/, this.queryRunner.release()];
                });
            });
        }
    };
    if (queryRunner) {
        // dynamic: this.queryRunner = manager;
        ObjectUtils_1.ObjectUtils.assign(queryRunner, { manager: manager });
    }
    return manager;
}
exports.createLiteralEntityManager = createLiteralEntityManager;
//# sourceMappingURL=LiteralEntityManager.js.map