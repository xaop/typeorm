import * as tslib_1 from "tslib";
/**
 * Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
 */
export function createLiteralRepository(_a) {
    var manager = _a.manager, target = _a.target, queryRunner = _a.queryRunner;
    return {
        manager: manager,
        queryRunner: queryRunner,
        target: target,
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
            var _a;
            return (_a = this.manager).merge.apply(_a, tslib_1.__spread([this.getMetadata().target, mergeIntoEntity], entityLikes));
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

//# sourceMappingURL=LiteralRepository.js.map
