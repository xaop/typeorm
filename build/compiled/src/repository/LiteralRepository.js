"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
 */
function createLiteralRepository(_a) {
    var manager = _a.manager, target = _a.target, queryRunner = _a.queryRunner;
    return {
        typeof: "Repository",
        manager: manager,
        queryRunner: queryRunner,
        // get instance() { // todo: implement it later
        //     return this.getMetadata().instance
        // },
        get target() {
            // if there is a metadata for this object, first we see if
            // this creates unpredictable result (and its a source of bugs), when before initialization target has one value,
            // and after initialization it has another value
            // todo: later we need to refactor this part to prevent confusion (maybe better to separate "target" from "instance")
            // todo: to make it, we need to replace all places where .target used as instance
            if (this.manager.connection.hasMetadata(target)) {
                return this.manager.connection.getMetadata(target).target;
            }
            return target;
        },
        getMetadata: function () {
            return this.manager.connection.getMetadata(target);
        },
        createQueryBuilder: function (alias, queryRunner) {
            return this.manager.createQueryBuilder(this.getMetadata().target, alias || this.getMetadata().targetName, queryRunner || this.queryRunner);
        },
        hasId: function (entity) {
            return this.manager.hasId(this.getMetadata().target, entity);
        },
        getId: function (entity) {
            return this.manager.getId(this.getMetadata().target, entity);
        },
        create: function (plainEntityLikeOrPlainEntityLikes) {
            return this.manager.create(this.getMetadata().target, plainEntityLikeOrPlainEntityLikes);
        },
        merge: function (mergeIntoEntity) {
            var entityLikes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                entityLikes[_i - 1] = arguments[_i];
            }
            return (_a = this.manager).merge.apply(_a, tslib_1.__spread([this.getMetadata().target, mergeIntoEntity], entityLikes));
            var _a;
        },
        preload: function (entityLike) {
            return this.manager.preload(this.getMetadata().target, entityLike);
        },
        save: function (entityOrEntities, options) {
            return this.manager.save(this.getMetadata().target, entityOrEntities, options);
        },
        remove: function (entityOrEntities, options) {
            return this.manager.remove(this.getMetadata().target, entityOrEntities, options);
        },
        insert: function (entity) {
            return this.manager.insert(this.getMetadata().target, entity);
        },
        update: function (criteria, partialEntity) {
            return this.manager.update(this.getMetadata().target, criteria, partialEntity);
        },
        delete: function (criteria) {
            return this.manager.delete(this.getMetadata().target, criteria);
        },
        count: function (optionsOrConditions) {
            return this.manager.count(this.getMetadata().target, optionsOrConditions);
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
        findOneOrFail: function (optionsOrConditions, maybeOptions) {
            return this.manager.findOneOrFail(this.getMetadata().target, optionsOrConditions, maybeOptions);
        },
        observe: function (optionsOrConditions) {
            return this.manager.observe(this.getMetadata().target, optionsOrConditions);
        },
        observeManyAndCount: function (optionsOrConditions) {
            return this.manager.observeManyAndCount(this.getMetadata().target, optionsOrConditions);
        },
        observeOne: function (optionsOrConditions) {
            return this.manager.observeOne(this.getMetadata().target, optionsOrConditions);
        },
        observeCount: function (optionsOrConditions) {
            return this.manager.observeCount(this.getMetadata().target, optionsOrConditions);
        },
        query: function (query, parameters) {
            return this.manager.query(query, parameters);
        },
        clear: function () {
            return this.manager.clear(this.getMetadata().target);
        },
        increment: function (conditions, propertyPath, value) {
            return this.manager.increment(this.getMetadata().target, conditions, propertyPath, value);
        },
        decrement: function (conditions, propertyPath, value) {
            return this.manager.decrement(this.getMetadata().target, conditions, propertyPath, value);
        },
        extend: function (custom) {
            return tslib_1.__assign({}, this, custom);
        }
    };
}
exports.createLiteralRepository = createLiteralRepository;
//# sourceMappingURL=LiteralRepository.js.map