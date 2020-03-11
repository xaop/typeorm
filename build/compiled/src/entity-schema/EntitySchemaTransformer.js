"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MetadataArgsStorage_1 = require("../metadata-args/MetadataArgsStorage");
/**
 * Transforms entity schema into metadata args storage.
 * The result will be just like entities read from decorators.
 */
var EntitySchemaTransformer = /** @class */ (function () {
    function EntitySchemaTransformer() {
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Transforms entity schema into new metadata args storage object.
     *
     * todo: we need to add embeddeds support
     */
    EntitySchemaTransformer.prototype.transform = function (connection, schemas) {
        var metadataArgsStorage = new MetadataArgsStorage_1.MetadataArgsStorage();
        // todo: to support this functionality in ORM we need ORM to support schemas with custom function that finds a
        // todo: a target and targetName / entityName
        var mappedRelationTargets = connection.options.mappedEntitySchemaProperties || [];
        schemas.forEach(function (entitySchema) {
            var options = entitySchema.options;
            if (!options.name)
                throw new Error("EntitySchema missing \"name\" property.");
            var optionsName = options.name;
            var columns = entitySchema.options.columns || {};
            var relations = entitySchema.options.relations || {};
            if (entitySchema.options.projection) {
                var _loop_1 = function (propertyName) {
                    if (entitySchema.options.projection.hasOwnProperty(propertyName)) {
                        var schemaOptions = entitySchema.options.projection[propertyName];
                        // if there is a type - it means it is a column
                        if (schemaOptions.type !== undefined) {
                            columns[propertyName] = schemaOptions;
                        }
                        // if there is a relation - it means it is a relation
                        if (schemaOptions.relation !== undefined) {
                            var relation = schemaOptions;
                            var target = relation.with;
                            if (!target) {
                                var mappedRelationTarget = mappedRelationTargets.find(function (mappedTarget) {
                                    return mappedTarget.model === optionsName && mappedTarget.property === propertyName;
                                });
                                if (mappedRelationTarget && !relation.with) {
                                    target = mappedRelationTarget.target;
                                }
                            }
                            if (target) {
                                relations[propertyName] = tslib_1.__assign({ target: target, type: relation.relation, inverseSide: relation.inverse, joinColumn: relation.joinColumnOptions ? relation.joinColumnOptions : relation.owner, joinTable: relation.joinTableOptions ? relation.joinTableOptions : relation.owner }, relation);
                            }
                        }
                    }
                };
                for (var propertyName in entitySchema.options.projection) {
                    _loop_1(propertyName);
                }
            }
            // add table metadata args from the schema
            var tableMetadata = {
                target: options.target || optionsName,
                name: options.tableName,
                database: options.database,
                schema: options.schema,
                type: options.type || "regular",
                orderBy: options.orderBy,
                synchronize: options.synchronize,
                expression: options.expression
            };
            metadataArgsStorage.tables.push(tableMetadata);
            // add columns metadata args from the schema
            Object.keys(columns).forEach(function (columnName) {
                var column = columns[columnName];
                var mode = "regular";
                if (column.createDate)
                    mode = "createDate";
                if (column.updateDate)
                    mode = "updateDate";
                if (column.version)
                    mode = "version";
                if (column.treeChildrenCount)
                    mode = "treeChildrenCount";
                if (column.treeLevel)
                    mode = "treeLevel";
                if (column.objectId)
                    mode = "objectId";
                var columnAgrs = {
                    target: options.target || optionsName,
                    mode: mode,
                    propertyName: columnName,
                    options: {
                        type: column.type,
                        name: column.objectId ? "_id" : column.name,
                        length: column.length,
                        width: column.width,
                        nullable: column.nullable,
                        readonly: column.readonly,
                        update: column.update,
                        select: column.select,
                        insert: column.insert,
                        primary: column.primary,
                        unique: column.unique,
                        comment: column.comment,
                        default: column.default,
                        onUpdate: column.onUpdate,
                        precision: column.precision,
                        scale: column.scale,
                        zerofill: column.zerofill,
                        unsigned: column.unsigned,
                        charset: column.charset,
                        collation: column.collation,
                        enum: column.enum,
                        asExpression: column.asExpression,
                        generatedType: column.generatedType,
                        hstoreType: column.hstoreType,
                        array: column.array,
                        transformer: column.transformer,
                        spatialFeatureType: column.spatialFeatureType,
                        srid: column.srid
                    }
                };
                metadataArgsStorage.columns.push(columnAgrs);
                if (column.generated) {
                    var generationArgs = {
                        target: options.target || optionsName,
                        propertyName: columnName,
                        strategy: typeof column.generated === "string" ? column.generated : "increment"
                    };
                    metadataArgsStorage.generations.push(generationArgs);
                }
                if (column.unique)
                    metadataArgsStorage.uniques.push({ target: options.target || optionsName, columns: [columnName] });
            });
            // add relation metadata args from the schema
            if (relations) {
                Object.keys(relations).forEach(function (relationName) {
                    var relationSchema = relations[relationName];
                    var relation = {
                        target: options.target || optionsName,
                        propertyName: relationName,
                        relationType: relationSchema.type,
                        isLazy: relationSchema.lazy || false,
                        type: relationSchema.target,
                        inverseSideProperty: relationSchema.inverseSide,
                        isTreeParent: relationSchema.treeParent,
                        isTreeChildren: relationSchema.treeChildren,
                        options: {
                            eager: relationSchema.eager || false,
                            cascade: relationSchema.cascade,
                            nullable: relationSchema.nullable,
                            onDelete: relationSchema.onDelete,
                            onUpdate: relationSchema.onUpdate,
                            deferrable: relationSchema.deferrable,
                            persistence: relationSchema.persistence
                        }
                    };
                    metadataArgsStorage.relations.push(relation);
                    // add join column
                    if (relationSchema.joinColumn) {
                        if (typeof relationSchema.joinColumn === "boolean") {
                            var joinColumn = {
                                target: options.target || optionsName,
                                propertyName: relationName
                            };
                            metadataArgsStorage.joinColumns.push(joinColumn);
                        }
                        else {
                            var joinColumn = {
                                target: options.target || optionsName,
                                propertyName: relationName,
                                name: relationSchema.joinColumn.name,
                                referencedColumnName: relationSchema.joinColumn.referencedColumnName
                            };
                            metadataArgsStorage.joinColumns.push(joinColumn);
                        }
                    }
                    // add join table
                    if (relationSchema.joinTable) {
                        if (typeof relationSchema.joinTable === "boolean") {
                            var joinTable = {
                                target: options.target || optionsName,
                                propertyName: relationName
                            };
                            metadataArgsStorage.joinTables.push(joinTable);
                        }
                        else {
                            var joinTable = {
                                target: options.target || optionsName,
                                propertyName: relationName,
                                name: relationSchema.joinTable.name,
                                database: relationSchema.joinTable.database,
                                schema: relationSchema.joinTable.schema,
                                joinColumns: (relationSchema.joinTable.joinColumn ? [relationSchema.joinTable.joinColumn] : relationSchema.joinTable.joinColumns),
                                inverseJoinColumns: (relationSchema.joinTable.inverseJoinColumn ? [relationSchema.joinTable.inverseJoinColumn] : relationSchema.joinTable.inverseJoinColumns),
                            };
                            metadataArgsStorage.joinTables.push(joinTable);
                        }
                    }
                });
            }
            // add index metadata args from the schema
            if (options.indices) {
                options.indices.forEach(function (index) {
                    var indexAgrs = {
                        target: options.target || optionsName,
                        name: index.name,
                        unique: index.unique === true ? true : false,
                        spatial: index.spatial === true ? true : false,
                        fulltext: index.fulltext === true ? true : false,
                        synchronize: index.synchronize === false ? false : true,
                        where: index.where,
                        sparse: index.sparse,
                        columns: index.columns
                    };
                    metadataArgsStorage.indices.push(indexAgrs);
                });
            }
            // add unique metadata args from the schema
            if (options.uniques) {
                options.uniques.forEach(function (unique) {
                    var uniqueAgrs = {
                        target: options.target || optionsName,
                        name: unique.name,
                        columns: unique.columns
                    };
                    metadataArgsStorage.uniques.push(uniqueAgrs);
                });
            }
            // add check metadata args from the schema
            if (options.checks) {
                options.checks.forEach(function (check) {
                    var checkAgrs = {
                        target: options.target || optionsName,
                        name: check.name,
                        expression: check.expression
                    };
                    metadataArgsStorage.checks.push(checkAgrs);
                });
            }
            // add exclusion metadata args from the schema
            if (options.exclusions) {
                options.exclusions.forEach(function (exclusion) {
                    var exclusionArgs = {
                        target: options.target || optionsName,
                        name: exclusion.name,
                        expression: exclusion.expression
                    };
                    metadataArgsStorage.exclusions.push(exclusionArgs);
                });
            }
        });
        return metadataArgsStorage;
    };
    return EntitySchemaTransformer;
}());
exports.EntitySchemaTransformer = EntitySchemaTransformer;
//# sourceMappingURL=EntitySchemaTransformer.js.map