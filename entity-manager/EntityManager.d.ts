import { DeepPartial } from "../common/DeepPartial";
import { ObjectType } from "../common/ObjectType";
import { Connection } from "../connection/Connection";
import { ObjectID } from "../driver/mongodb/typings";
import { IsolationLevel } from "../driver/types/IsolationLevel";
import { QueryDeepPartialEntity } from "../query-builder/QueryPartialEntity";
import { FindExtraOptions, FindOptions, FindOptionsWhere } from "../find-options/FindOptions";
import { EntitySchema } from "../index";
import { DeleteResult } from "../query-builder/result/DeleteResult";
import { InsertResult } from "../query-builder/result/InsertResult";
import { UpdateResult } from "../query-builder/result/UpdateResult";
import { SelectQueryBuilder } from "../query-builder/SelectQueryBuilder";
import { PlainObjectToNewEntityTransformer } from "../query-builder/transformer/PlainObjectToNewEntityTransformer";
import { QueryRunner } from "../query-runner/QueryRunner";
import { MongoRepository } from "../repository/MongoRepository";
import { RemoveOptions } from "../repository/RemoveOptions";
import { Repository } from "../repository/Repository";
import { SaveOptions } from "../repository/SaveOptions";
import { TreeRepository } from "../repository/TreeRepository";
import * as Observable from "zen-observable";
import { EntityTarget } from "../common/EntityTarget";
/**
 * Entity manager supposed to work with any entity, automatically find its repository and call its methods,
 * whatever entity type are you passing.
 */
export declare class EntityManager {
    /**
     * Connection used by this entity manager.
     */
    readonly connection: Connection;
    /**
     * Custom query runner to be used for operations in this entity manager.
     * Used only in non-global entity manager.
     */
    readonly queryRunner?: QueryRunner;
    /**
     * Once created and then reused by repositories.
     */
    protected repositories: Repository<any>[];
    /**
     * Once created and then reused by repositories.
     */
    protected treeRepositories: TreeRepository<any>[];
    /**
     * Plain to object transformer used in create and merge operations.
     */
    protected plainObjectToEntityTransformer: PlainObjectToNewEntityTransformer;
    constructor(connection: Connection, queryRunner?: QueryRunner);
    /**
     * Wraps given function execution (and all operations made there) in a transaction.
     * All database operations must be executed using provided entity manager.
     */
    transaction<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T>;
    /**
     * Wraps given function execution (and all operations made there) in a transaction.
     * All database operations must be executed using provided entity manager.
     */
    transaction<T>(isolationLevel: IsolationLevel, runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T>;
    /**
     * Executes raw SQL query and returns raw database results.
     */
    query(query: string, parameters?: any[]): Promise<any>;
    /**
     * Creates a new query builder that can be used to build a sql query.
     */
    createQueryBuilder<Entity>(entityClass: ObjectType<Entity>, alias: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity>;
    /**
     * Creates a new query builder that can be used to build a sql query.
     */
    createQueryBuilder<Entity>(entityClass: EntitySchema<Entity>, alias: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity>;
    /**
     * Creates a new query builder that can be used to build a sql query.
     */
    createQueryBuilder<Entity>(entityName: string, alias: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity>;
    /**
     * Creates a new query builder that can be used to build a sql query.
     */
    createQueryBuilder(queryRunner?: QueryRunner): SelectQueryBuilder<any>;
    /**
     * Checks if entity has an id.
     */
    hasId(entity: any): boolean;
    /**
     * Checks if entity of given schema name has an id.
     */
    hasId(target: Function | string, entity: any): boolean;
    /**
     * Gets entity mixed id.
     */
    getId(entity: any): any;
    /**
     * Gets entity mixed id.
     */
    getId(target: Function | string, entity: any): any;
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that present in entity schema.
     */
    create<Entity>(entityClass: ObjectType<Entity>, plainObject?: DeepPartial<Entity>): Entity;
    /**
     * Creates a new entities and copies all entity properties from given objects into their new entities.
     * Note that it copies only properties that present in entity schema.
     */
    create<Entity>(entityClass: ObjectType<Entity>, plainObjects?: DeepPartial<Entity>[]): Entity[];
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that present in entity schema.
     */
    create<Entity>(entitySchema: EntitySchema<Entity>, plainObject?: DeepPartial<Entity>): Entity;
    /**
     * Creates a new entities and copies all entity properties from given objects into their new entities.
     * Note that it copies only properties that present in entity schema.
     */
    create<Entity>(entitySchema: EntitySchema<Entity>, plainObjects?: DeepPartial<Entity>[]): Entity[];
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that present in entity schema.
     */
    create<Entity>(entityName: string, plainObject?: DeepPartial<Entity>): Entity;
    /**
     * Creates a new entities and copies all entity properties from given objects into their new entities.
     * Note that it copies only properties that present in entity schema.
     */
    create<Entity>(entityName: string, plainObjects?: DeepPartial<Entity>[]): Entity[];
    /**
     * Merges two entities into one new entity.
     */
    merge<Entity>(entityClass: ObjectType<Entity>, mergeIntoEntity: Entity, ...entityLikes: DeepPartial<Entity>[]): Entity;
    /**
     * Merges two entities into one new entity.
     */
    merge<Entity>(entitySchema: EntitySchema<Entity>, mergeIntoEntity: Entity, ...entityLikes: DeepPartial<Entity>[]): Entity;
    /**
     * Merges two entities into one new entity.
     */
    merge<Entity>(entityName: string, mergeIntoEntity: Entity, ...entityLikes: DeepPartial<Entity>[]): Entity;
    /**
     * Creates a new entity from the given plan javascript object. If entity already exist in the database, then
     * it loads it (and everything related to it), replaces all values with the new ones from the given object
     * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
     * replaced from the new object.
     */
    preload<Entity>(entityClass: ObjectType<Entity>, entityLike: DeepPartial<Entity>): Promise<Entity | undefined>;
    /**
     * Creates a new entity from the given plan javascript object. If entity already exist in the database, then
     * it loads it (and everything related to it), replaces all values with the new ones from the given object
     * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
     * replaced from the new object.
     */
    preload<Entity>(entitySchema: EntitySchema<Entity>, entityLike: DeepPartial<Entity>): Promise<Entity | undefined>;
    /**
     * Creates a new entity from the given plan javascript object. If entity already exist in the database, then
     * it loads it (and everything related to it), replaces all values with the new ones from the given object
     * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
     * replaced from the new object.
     */
    preload(entityName: string, entityLike: DeepPartial<any>): Promise<any | undefined>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<Entity>(entities: Entity[], options?: SaveOptions): Promise<Entity[]>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<Entity>(entity: Entity, options?: SaveOptions): Promise<Entity>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<Entity, T extends DeepPartial<Entity>>(targetOrEntity: ObjectType<Entity> | EntitySchema<Entity>, entities: T[], options?: SaveOptions): Promise<T[]>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<Entity, T extends DeepPartial<Entity>>(targetOrEntity: ObjectType<Entity> | EntitySchema<Entity>, entity: T, options?: SaveOptions): Promise<T>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<T>(targetOrEntity: string, entities: T[], options?: SaveOptions): Promise<T[]>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<T>(targetOrEntity: string, entity: T, options?: SaveOptions): Promise<T>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(entity: Entity, options?: RemoveOptions): Promise<Entity>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(targetOrEntity: ObjectType<Entity>, entity: Entity, options?: RemoveOptions): Promise<Entity>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(targetOrEntity: EntitySchema<Entity>, entity: Entity, options?: RemoveOptions): Promise<Entity>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(targetOrEntity: string, entity: Entity, options?: RemoveOptions): Promise<Entity>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(entity: Entity[], options?: RemoveOptions): Promise<Entity>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(targetOrEntity: ObjectType<Entity>, entity: Entity[], options?: RemoveOptions): Promise<Entity[]>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(targetOrEntity: EntitySchema<Entity>, entity: Entity[], options?: RemoveOptions): Promise<Entity[]>;
    /**
     * Removes a given entity from the database.
     */
    remove<Entity>(targetOrEntity: string, entity: Entity[], options?: RemoveOptions): Promise<Entity[]>;
    /**
     * Inserts a given entity into the database.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient INSERT query.
     * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
     * You can execute bulk inserts using this method.
     */
    insert<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string, entity: QueryDeepPartialEntity<Entity> | (QueryDeepPartialEntity<Entity>[])): Promise<InsertResult>;
    /**
     * Updates entity partially. Entity can be found by a given condition(s).
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     * Condition(s) cannot be empty.
     */
    update<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string, criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindOptionsWhere<Entity>, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult>;
    /**
     * Deletes entities by a given condition(s).
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     * Condition(s) cannot be empty.
     */
    delete<Entity>(targetOrEntity: ObjectType<Entity> | EntitySchema<Entity> | string, criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindOptionsWhere<Entity>): Promise<DeleteResult>;
    /**
     * Counts entities that match given conditions.
     * Useful for pagination.
     */
    count<Entity>(entityClass: ObjectType<Entity>, conditions?: FindOptionsWhere<Entity>, options?: FindExtraOptions): Promise<number>;
    /**
     * Counts entities that match given conditions.
     * Useful for pagination.
     */
    count<Entity>(entityClass: EntitySchema<Entity>, conditions?: FindOptionsWhere<Entity>, options?: FindExtraOptions): Promise<number>;
    /**
     * Counts entities that match given conditions.
     * Useful for pagination.
     */
    count<Entity>(entityClass: string, conditions?: FindOptionsWhere<Entity>, options?: FindExtraOptions): Promise<number>;
    /**
     * Finds entities that match given options.
     */
    find<Entity>(entityClass: ObjectType<Entity>, options?: FindOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entityClass: ObjectType<Entity>, conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given options.
     */
    find<Entity>(entitySchema: EntitySchema<Entity>, options?: FindOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entitySchema: EntitySchema<Entity>, conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entityClass: string, options?: FindOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entityClass: string, conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClass: ObjectType<Entity>, options?: FindOptions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClass: EntitySchema<Entity>, options?: FindOptions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClass: string, options?: FindOptions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClass: ObjectType<Entity>, conditions?: FindOptionsWhere<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClass: EntitySchema<Entity>, conditions?: FindOptionsWhere<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClass: string, conditions?: FindOptionsWhere<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities with ids.
     * Optionally find options can be applied.
     */
    findByIds<Entity>(entityClass: ObjectType<Entity>, ids: any[], options?: FindOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities with ids.
     * Optionally find options can be applied.
     */
    findByIds<Entity>(entityClass: EntitySchema<Entity>, ids: any[], options?: FindOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities with ids.
     * Optionally find options can be applied.
     */
    findByIds<Entity>(entityClass: string, ids: any[], options?: FindOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities with ids.
     * Optionally conditions can be applied.
     */
    findByIds<Entity>(entityClass: ObjectType<Entity>, ids: any[], conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    /**
     * Finds entities with ids.
     * Optionally conditions can be applied.
     */
    findByIds<Entity>(entityClass: EntitySchema<Entity>, ids: any[], conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    /**
     * Finds entities with ids.
     * Optionally conditions can be applied.
     */
    findByIds<Entity>(entityClass: string, ids: any[], conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne<Entity>(entityClass: ObjectType<Entity>, id?: string | number | Date | ObjectID, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne<Entity>(entityClass: EntitySchema<Entity>, id?: string | number | Date | ObjectID, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne<Entity>(entityClass: string, id?: string | number | Date | ObjectID, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne<Entity>(entityClass: ObjectType<Entity>, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne<Entity>(entityClass: EntitySchema<Entity>, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne<Entity>(entityClass: string, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given conditions.
     */
    findOne<Entity>(entityClass: ObjectType<Entity>, conditions?: FindOptionsWhere<Entity>, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given conditions.
     */
    findOne<Entity>(entityClass: EntitySchema<Entity>, conditions?: FindOptionsWhere<Entity>, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given conditions.
     */
    findOne<Entity>(entityClass: string, conditions?: FindOptionsWhere<Entity>, options?: FindOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given find options or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: ObjectType<Entity>, id?: string | number | Date | ObjectID, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given find options or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: EntitySchema<Entity>, id?: string | number | Date | ObjectID, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given find options or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: string, id?: string | number | Date | ObjectID, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given find options or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: ObjectType<Entity>, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given find options or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: EntitySchema<Entity>, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given find options or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: string, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given conditions or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: ObjectType<Entity>, conditions?: FindOptionsWhere<Entity>, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given conditions or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: EntitySchema<Entity>, conditions?: FindOptionsWhere<Entity>, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given conditions or rejects the returned promise on error.
     */
    findOneOrFail<Entity>(entityClass: string, conditions?: FindOptionsWhere<Entity>, options?: FindOptions<Entity>): Promise<Entity>;
    /**
     * Finds entities that match given options and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observe<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, options?: FindOptions<Entity>): Observable<Entity[]>;
    /**
     * Finds entities that match given conditions and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observe<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, conditions?: FindOptionsWhere<Entity>): Observable<Entity[]>;
    /**
     * Finds entities and count that match given options and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observeManyAndCount<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, options?: FindOptions<Entity>): Observable<[Entity[], number]>;
    /**
     * Finds entities and count that match given conditions and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observeManyAndCount<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, conditions?: FindOptionsWhere<Entity>): Observable<[Entity[], number]>;
    /**
     * Finds entity that match given options and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observeOne<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, options?: FindOptions<Entity>): Observable<Entity>;
    /**
     * Finds entity that match given conditions and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observeOne<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, conditions?: FindOptionsWhere<Entity>): Observable<Entity>;
    /**
     * Gets the entities count match given options and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observeCount<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, options?: FindOptions<Entity>): Observable<number>;
    /**
     * Gets the entities count match given options and returns observable.
     * Whenever new data appears that matches given query observable emits new value.
     */
    observeCount<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, conditions?: FindOptionsWhere<Entity>): Observable<number>;
    /**
     * Clears all the data from the given table (truncates/drops it).
     *
     * Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.
     * @see https://stackoverflow.com/a/5972738/925151
     */
    clear<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string): Promise<void>;
    /**
     * Increments some column by provided value of the entities matched given conditions.
     */
    increment<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, conditions: FindOptionsWhere<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult>;
    /**
     * Decrements some column by provided value of the entities matched given conditions.
     */
    decrement<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, conditions: FindOptionsWhere<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult>;
    /**
     * Gets repository for the given entity class or name.
     * If single database connection mode is used, then repository is obtained from the
     * repository aggregator, where each repository is individually created for this entity manager.
     * When single database connection is not used, repository is being obtained from the connection.
     */
    getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>;
    /**
     * Gets tree repository for the given entity class or name.
     * If single database connection mode is used, then repository is obtained from the
     * repository aggregator, where each repository is individually created for this entity manager.
     * When single database connection is not used, repository is being obtained from the connection.
     */
    getTreeRepository<Entity>(target: EntityTarget<Entity>): TreeRepository<Entity>;
    /**
     * Gets mongodb repository for the given entity class.
     */
    getMongoRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): MongoRepository<Entity>;
    /**
     * Gets custom entity repository marked with @EntityRepository decorator.
     */
    getCustomRepository<T>(customRepository: ObjectType<T>): T;
    /**
     * Releases all resources used by entity manager.
     * This is used when entity manager is created with a single query runner,
     * and this single query runner needs to be released after job with entity manager is done.
     */
    release(): Promise<void>;
}