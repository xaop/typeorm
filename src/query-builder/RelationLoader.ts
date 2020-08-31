import {
    Connection,
    ObjectLiteral,
    QueryRunner,
    SelectQueryBuilder
} from "../";
import { RelationMetadata } from "../metadata/RelationMetadata";
import { DriverUtils } from "../driver/DriverUtils";

/**
 * Wraps entities and creates getters/setters for their relations
 * to be able to lazily load relations when accessing these relations.
 */
export class RelationLoader {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private connection: Connection) {}

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Loads relation data for the given entity and its relation.
     */
    load(
        relation: RelationMetadata,
        entityOrEntities: ObjectLiteral | ObjectLiteral[],
        queryRunner?: QueryRunner,
        queryBuilder?: SelectQueryBuilder<any>
    ): Promise<any[]> {
        // todo: check all places where it uses non array
        if (queryRunner && queryRunner.isReleased) queryRunner = undefined; // get new one if already closed
        if (relation.isManyToOne || relation.isOneToOneOwner) {
            return this.loadManyToOneOrOneToOneOwner(
                relation,
                entityOrEntities,
                queryRunner,
                queryBuilder
            );
        } else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
            return this.loadOneToManyOrOneToOneNotOwner(
                relation,
                entityOrEntities,
                queryRunner,
                queryBuilder
            );
        } else if (relation.isManyToManyOwner) {
            return this.loadManyToManyOwner(
                relation,
                entityOrEntities,
                queryRunner,
                queryBuilder
            );
        } else {
            // many-to-many non owner
            return this.loadManyToManyNotOwner(
                relation,
                entityOrEntities,
                queryRunner,
                queryBuilder
            );
        }
    }

    /**
     * Loads data for many-to-one and one-to-one owner relations.
     *
     * (ow) post.category<=>category.post
     * loaded: category from post
     * example: SELECT category.id AS category_id, category.name AS category_name FROM category category
     *              INNER JOIN post Post ON Post.category=category.id WHERE Post.id=1
     */
    loadManyToOneOrOneToOneOwner(
        relation: RelationMetadata,
        entityOrEntities: ObjectLiteral | ObjectLiteral[],
        queryRunner?: QueryRunner,
        queryBuilder?: SelectQueryBuilder<any>
    ): Promise<any> {
        const entities = Array.isArray(entityOrEntities)
            ? entityOrEntities
            : [entityOrEntities];

        const qb = queryBuilder
            ? queryBuilder
            : this.connection
                  .createQueryBuilder(queryRunner)
                  .select(relation.propertyName) // category
                  .from(relation.type, relation.propertyName); // Category, category

        const mainAlias = qb.expressionMap.mainAlias!.name;
        const columns = relation.entityMetadata.primaryColumns;
        const joinColumns = relation.isOwning
            ? relation.joinColumns
            : relation.inverseRelation!.joinColumns;
        const joinAliasName =
            relation.entityMetadata.name +
            (relation.entityMetadata.name === mainAlias ? "_2" : "");
        const conditions = joinColumns
            .map(joinColumn => {
                return `${joinAliasName}.${
                    joinColumn.propertyName
                } = ${mainAlias}.${joinColumn.referencedColumn!.propertyName}`;
            })
            .join(" AND ");

        qb.innerJoin(
            relation.entityMetadata.target as Function,
            joinAliasName,
            conditions
        );

        if (columns.length === 1) {
            const values = entities.map(entity =>
                columns[0].getEntityValue(entity)
            );
            const areAllNumbers = values.every(
                value => typeof value === "number"
            );

            const paramAndValues = DriverUtils.buildParamAndValuesForInClause(this.connection.driver, `${joinAliasName}.${columns[0].propertyPath}`, values);
            if (areAllNumbers) {
                qb.where(
                    `${paramAndValues.param} IN (${paramAndValues.values.join(", ")})`
                );
            } else {
                // Hack Julien (Fix the parameter too long issue we have on oracle (limit is 30)
                // qb.where(`${joinAliasName}.${columns[0].propertyPath} IN (:...${joinAliasName + "_" + columns[0].propertyName})`);
                // qb.setParameter(joinAliasName + "_" + columns[0].propertyName, values);
                const parameterName = DriverUtils.buildColumnAlias(
                    this.connection.driver,
                    joinAliasName,
                    columns[0].propertyName
                );
                qb.where(
                    `${paramAndValues.param} IN (:...${parameterName})`
                );
                qb.setParameter(parameterName, paramAndValues.values);
            }
        } else {
            const condition = entities
                .map((entity, entityIndex) => {
                    return columns
                        .map((column, columnIndex) => {
                            // Hack Julien (Fix the parameter too long issue we have on oracle (limit is 30)
                            // const paramName = joinAliasName + "_entity_" + entityIndex + "_" + columnIndex;
                            const paramName = DriverUtils.buildColumnAlias(
                                this.connection.driver,
                                joinAliasName,
                                "entity_" + entityIndex + "_" + columnIndex
                            );
                            qb.setParameter(
                                paramName,
                                column.getEntityValue(entity)
                            );
                            return (
                                joinAliasName +
                                "." +
                                column.propertyPath +
                                " = :" +
                                paramName
                            );
                        })
                        .join(" AND ");
                })
                .map(condition => "(" + condition + ")")
                .join(" OR ");
            qb.where(condition);
        }

        return qb.getMany();
        // return qb.getOne(); todo: fix all usages
    }

    /**
     * Loads data for one-to-many and one-to-one not owner relations.
     *
     * SELECT post
     * FROM post post
     * WHERE post.[joinColumn.name] = entity[joinColumn.referencedColumn]
     */
    loadOneToManyOrOneToOneNotOwner(
        relation: RelationMetadata,
        entityOrEntities: ObjectLiteral | ObjectLiteral[],
        queryRunner?: QueryRunner,
        queryBuilder?: SelectQueryBuilder<any>
    ): Promise<any> {
        const entities = Array.isArray(entityOrEntities)
            ? entityOrEntities
            : [entityOrEntities];
        const columns = relation.inverseRelation!.joinColumns;

        const qb = queryBuilder
            ? queryBuilder
            : this.connection
                  .createQueryBuilder(queryRunner)
                  .select(relation.propertyName)
                  .from(relation.type, relation.propertyName);

        const aliasName = qb.expressionMap.mainAlias!.name;

        if (columns.length === 1) {
            const values = entities.map(entity =>
                columns[0].referencedColumn!.getEntityValue(entity)
            );
            const areAllNumbers = values.every(
                value => typeof value === "number"
            );

            const paramAndValues = DriverUtils.buildParamAndValuesForInClause(
                this.connection.driver,
                `${aliasName}.${columns[0].propertyPath}`,
                values
            );
            if (areAllNumbers) {
                qb.where(
                    `${paramAndValues.param} IN (${paramAndValues.values.join(
                        ", "
                    )})`
                );
            } else {
                // Hack Julien (Fix the parameter too long issue we have on oracle (limit is 30)
                // qb.where(`${aliasName}.${columns[0].propertyPath} IN (:...${aliasName + "_" + columns[0].propertyName})`);
                // qb.setParameter(aliasName + "_" + columns[0].propertyName, values);
                const parameterName = DriverUtils.buildColumnAlias(
                    this.connection.driver,
                    aliasName,
                    columns[0].propertyName
                );
                qb.where(`${paramAndValues.param} IN (:...${parameterName})`);
                qb.setParameter(parameterName, paramAndValues.values);
            }
        } else {
            const condition = entities
                .map((entity, entityIndex) => {
                    return columns
                        .map((column, columnIndex) => {
                            // Hack Julien (Fix the parameter too long issue we have on oracle (limit is 30)
                            const paramName = DriverUtils.buildColumnAlias(
                                this.connection.driver,
                                aliasName,
                                "entity_" + entityIndex + "_" + columnIndex
                            );
                            // const paramName = aliasName + "_entity_" + entityIndex + "_" + columnIndex;
                            qb.setParameter(
                                paramName,
                                column.referencedColumn!.getEntityValue(entity)
                            );
                            return (
                                aliasName +
                                "." +
                                column.propertyPath +
                                " = :" +
                                paramName
                            );
                        })
                        .join(" AND ");
                })
                .map(condition => "(" + condition + ")")
                .join(" OR ");
            qb.where(condition);
        }
        return qb.getMany();
        // return relation.isOneToMany ? qb.getMany() : qb.getOne(); todo: fix all usages
    }

    /**
     * Loads data for many-to-many owner relations.
     *
     * SELECT category
     * FROM category category
     * INNER JOIN post_categories post_categories
     * ON post_categories.postId = :postId
     * AND post_categories.categoryId = category.id
     */
    loadManyToManyOwner(
        relation: RelationMetadata,
        entityOrEntities: ObjectLiteral | ObjectLiteral[],
        queryRunner?: QueryRunner,
        queryBuilder?: SelectQueryBuilder<any>;
    ): Promise<any> {
        const entities = Array.isArray(entityOrEntities)
            ? entityOrEntities
            : [entityOrEntities];

        const qb = queryBuilder
            ? queryBuilder
            : this.connection
                  .createQueryBuilder(queryRunner)
                  .select(relation.propertyName)
                  .from(relation.type, relation.propertyName);

        const mainAlias = qb.expressionMap.mainAlias!.name;
        const joinAlias = relation.junctionEntityMetadata!.tableName;

        const parameters: ObjectLiteral = {};
        const joinColumnConditions: string[] = [];
        relation.joinColumns.forEach(joinColumn => {
            const values = entities.map(entity =>
                joinColumn.referencedColumn!.getEntityValue(entity)
            );
            const areAllNumbers = values.every(
                value => typeof value === "number"
            );

            const paramAndValues = DriverUtils.buildParamAndValuesForInClause(this.connection.driver, `${joinAlias}.${joinColumn.propertyName}`, values);
            if (areAllNumbers) {
                joinColumnConditions.push(
                    `${paramAndValues.param} IN (${paramAndValues.values.join(
                        ", "
                    )})`
                );
            } else {
                parameters[joinColumn.propertyName] = paramAndValues.values;
                joinColumnConditions.push(
                    `${paramAndValues.param} IN (:...${joinColumn.propertyName})`
                );
            }
        });

        const inverseJoinColumnConditions = relation.inverseJoinColumns.map(
            inverseJoinColumn => {
                return `${joinAlias}.${
                    inverseJoinColumn.propertyName
                }=${mainAlias}.${
                    inverseJoinColumn.referencedColumn!.propertyName
                }`;
            }
        );

        return qb
            .innerJoin(
                joinAlias,
                joinAlias,
                [...joinColumnConditions, ...inverseJoinColumnConditions].join(
                    " AND "
                )
            )
            .setParameters(parameters)
            .getMany();
    }

    /**
     * Loads data for many-to-many not owner relations.
     *
     * SELECT post
     * FROM post post
     * INNER JOIN post_categories post_categories
     * ON post_categories.postId = post.id
     * AND post_categories.categoryId = post_categories.categoryId
     */
    loadManyToManyNotOwner(
        relation: RelationMetadata,
        entityOrEntities: ObjectLiteral | ObjectLiteral[],
        queryRunner?: QueryRunner,
        queryBuilder?: SelectQueryBuilder<any>
    ): Promise<any> {
        const entities = Array.isArray(entityOrEntities)
            ? entityOrEntities
            : [entityOrEntities];

        const qb = queryBuilder
            ? queryBuilder
            : this.connection
                  .createQueryBuilder(queryRunner)
                  .select(relation.propertyName)
                  .from(relation.type, relation.propertyName);

        const mainAlias = qb.expressionMap.mainAlias!.name;
        const joinAlias = relation.junctionEntityMetadata!.tableName;
        const joinColumnConditions = relation.inverseRelation!.joinColumns.map(
            joinColumn => {
                return `${joinAlias}.${
                    joinColumn.propertyName
                } = ${mainAlias}.${joinColumn.referencedColumn!.propertyName}`;
            }
        );

        const parameters: ObjectLiteral = {};
        const inverseJoinColumnConditions: string[] = [];
        relation.inverseRelation!.inverseJoinColumns.forEach(column => {
            const values = entities.map(entity =>
                column.referencedColumn!.getEntityValue(entity)
            );
            const areAllNumbers = values.every(
                value => typeof value === "number"
            );

            const paramAndValues = DriverUtils.buildParamAndValuesForInClause(this.connection.driver, `${joinAlias}.${column.propertyName}`, values);
            if (areAllNumbers) {
                joinColumnConditions.push(
                    `${paramAndValues.param} IN (${paramAndValues.values.join(
                        ", "
                    )})`
                );
            } else {
                parameters[column.propertyName] = paramAndValues.values;
                joinColumnConditions.push(
                    `${paramAndValues.param} IN (:...${column.propertyName})`
                );
            }
        });

        return qb
            .innerJoin(
                joinAlias,
                joinAlias,
                [...joinColumnConditions, ...inverseJoinColumnConditions].join(
                    " AND "
                )
            )
            .setParameters(parameters)
            .getMany();
    }

    /**
     * Wraps given entity and creates getters/setters for its given relation
     * to be able to lazily load data when accessing this relation.
     */
    enableLazyLoad(
        relation: RelationMetadata,
        entity: ObjectLiteral,
        queryRunner?: QueryRunner,
        queryBuilder?: SelectQueryBuilder<any>
    ) {
        const relationLoader = this;
        const dataIndex = "__" + relation.propertyName + "__"; // in what property of the entity loaded data will be stored
        const promiseIndex = "__promise_" + relation.propertyName + "__"; // in what property of the entity loading promise will be stored
        const resolveIndex = "__has_" + relation.propertyName + "__"; // indicates if relation data already was loaded or not, we need this flag if loaded data is empty

        Object.defineProperty(entity, relation.propertyName, {
            get: function() {
                if (
                    this[resolveIndex] === true ||
                    this[dataIndex] !== undefined
                )
                    // if related data already was loaded then simply return it
                    return Promise.resolve(this[dataIndex]);

                if (this[promiseIndex])
                    // if related data is loading then return a promise relationLoader loads it
                    return this[promiseIndex];

                // nothing is loaded yet, load relation data and save it in the model once they are loaded
                this[promiseIndex] = relationLoader
                    .load(relation, this, queryRunner, queryBuilder)
                    .then(result => {
                        if (relation.isOneToOne || relation.isManyToOne)
                            result = result[0];
                        this[dataIndex] = result;
                        this[resolveIndex] = true;
                        delete this[promiseIndex];
                        return this[dataIndex];
                    });
                return this[promiseIndex];
            },
            set: function(value: any | Promise<any>) {
                if (value instanceof Promise) {
                    // if set data is a promise then wait for its resolve and save in the object
                    value.then(result => {
                        this[dataIndex] = result;
                        this[resolveIndex] = true;
                    });
                } else {
                    // if its direct data set (non promise, probably not safe-typed)
                    this[dataIndex] = value;
                    this[resolveIndex] = true;
                }
            },
            configurable: true
        });
    }
}
