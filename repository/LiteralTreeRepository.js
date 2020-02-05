"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AbstractSqliteDriver_1 = require("../driver/sqlite-abstract/AbstractSqliteDriver");
var LiteralRepository_1 = require("./LiteralRepository");
/**
 * Repository is supposed to work with your entity objects. Find entities, insert, update, delete, etc.
 */
function createLiteralTreeRepository(_a) {
    var manager = _a.manager, target = _a.target, queryRunner = _a.queryRunner;
    function createRelationMaps(metadata, alias, rawResults) {
        return rawResults.map(function (rawResult) {
            var joinColumn = metadata.treeParentRelation.joinColumns[0];
            // fixes issue #2518, default to databaseName property when givenDatabaseName is not set
            var joinColumnName = joinColumn.givenDatabaseName || joinColumn.databaseName;
            var id = rawResult[alias + "_" + metadata.primaryColumns[0].databaseName];
            var parentId = rawResult[alias + "_" + joinColumnName];
            return {
                id: metadata.connection.driver.prepareHydratedValue(id, metadata.primaryColumns[0]),
                parentId: metadata.connection.driver.prepareHydratedValue(parentId, joinColumn),
            };
        });
    }
    function buildChildrenEntityTree(metadata, entity, entities, relationMaps) {
        var childProperty = metadata.treeChildrenRelation.propertyName;
        var parentEntityId = metadata.primaryColumns[0].getEntityValue(entity);
        var childRelationMaps = relationMaps.filter(function (relationMap) { return relationMap.parentId === parentEntityId; });
        var childIds = childRelationMaps.map(function (relationMap) { return relationMap.id; });
        entity[childProperty] = entities.filter(function (entity) { return childIds.indexOf(entity.id) !== -1; });
        entity[childProperty].forEach(function (childEntity) {
            buildChildrenEntityTree(metadata, childEntity, entities, relationMaps);
        });
    }
    function buildParentEntityTree(metadata, entity, entities, relationMaps) {
        var parentProperty = metadata.treeParentRelation.propertyName;
        var entityId = metadata.primaryColumns[0].getEntityValue(entity);
        var parentRelationMap = relationMaps.find(function (relationMap) { return relationMap.id === entityId; });
        var parentEntity = entities.find(function (entity) {
            if (!parentRelationMap)
                return false;
            return entity[metadata.primaryColumns[0].propertyName] === parentRelationMap.parentId;
        });
        if (parentEntity) {
            entity[parentProperty] = parentEntity;
            buildParentEntityTree(metadata, entity[parentProperty], entities, relationMaps);
        }
    }
    // -------------------------------------------------------------------------
    return tslib_1.__assign({}, LiteralRepository_1.createLiteralRepository({ manager: manager, target: target, queryRunner: queryRunner }), { findTrees: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var roots;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findRoots()];
                        case 1:
                            roots = _a.sent();
                            return [4 /*yield*/, Promise.all(roots.map(function (root) { return _this.findDescendantsTree(root); }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, roots];
                    }
                });
            });
        },
        findRoots: function () {
            var _this = this;
            var escapeAlias = function (alias) { return _this.manager.connection.driver.escape(alias); };
            var escapeColumn = function (column) { return _this.manager.connection.driver.escape(column); };
            var parentPropertyName = this.manager.connection.namingStrategy.joinColumnName(this.getMetadata().treeParentRelation.propertyName, "id");
            return this.createQueryBuilder("treeEntity")
                .where(escapeAlias("treeEntity") + "." + escapeColumn(parentPropertyName) + " IS NULL")
                .getMany();
        },
        findDescendants: function (entity) {
            return this
                .createDescendantsQueryBuilder("treeEntity", "treeClosure", entity)
                .getMany();
        },
        findDescendantsTree: function (entity) {
            var _this = this;
            // todo: throw exception if there is no column of this relation?
            return this
                .createDescendantsQueryBuilder("treeEntity", "treeClosure", entity)
                .getRawAndEntities()
                .then(function (entitiesAndScalars) {
                var relationMaps = createRelationMaps(_this.getMetadata(), "treeEntity", entitiesAndScalars.raw);
                buildChildrenEntityTree(_this.getMetadata(), entity, entitiesAndScalars.entities, relationMaps);
                return entity;
            });
        },
        countDescendants: function (entity) {
            return this
                .createDescendantsQueryBuilder("treeEntity", "treeClosure", entity)
                .getCount();
        },
        createDescendantsQueryBuilder: function (alias, closureTableAlias, entity) {
            var _this = this;
            // create shortcuts for better readability
            var escape = function (alias) { return _this.manager.connection.driver.escape(alias); };
            if (this.getMetadata().treeType === "closure-table") {
                var joinCondition = this.getMetadata().closureJunctionTable.descendantColumns.map(function (column) {
                    return escape(closureTableAlias) + "." + escape(column.propertyPath) + " = " + escape(alias) + "." + escape(column.referencedColumn.propertyPath);
                }).join(" AND ");
                var parameters_1 = {};
                var whereCondition = this.getMetadata().closureJunctionTable.ancestorColumns.map(function (column) {
                    parameters_1[column.referencedColumn.propertyName] = column.referencedColumn.getEntityValue(entity);
                    return escape(closureTableAlias) + "." + escape(column.propertyPath) + " = :" + column.referencedColumn.propertyName;
                }).join(" AND ");
                return this
                    .createQueryBuilder(alias)
                    .innerJoin(this.getMetadata().closureJunctionTable.tableName, closureTableAlias, joinCondition)
                    .where(whereCondition)
                    .setParameters(parameters_1);
            }
            else if (this.getMetadata().treeType === "nested-set") {
                var whereCondition = alias + "." + this.getMetadata().nestedSetLeftColumn.propertyPath + " BETWEEN " +
                    "joined." + this.getMetadata().nestedSetLeftColumn.propertyPath + " AND joined." + this.getMetadata().nestedSetRightColumn.propertyPath;
                var parameters_2 = {};
                var joinCondition = this.getMetadata().treeParentRelation.joinColumns.map(function (joinColumn) {
                    var parameterName = joinColumn.referencedColumn.propertyPath.replace(".", "_");
                    parameters_2[parameterName] = joinColumn.referencedColumn.getEntityValue(entity);
                    return "joined." + joinColumn.referencedColumn.propertyPath + " = :" + parameterName;
                }).join(" AND ");
                return this
                    .createQueryBuilder(alias)
                    .innerJoin(this.getMetadata().targetName, "joined", whereCondition)
                    .where(joinCondition, parameters_2);
            }
            else if (this.getMetadata().treeType === "materialized-path") {
                return this
                    .createQueryBuilder(alias)
                    .where(function (qb) {
                    var subQuery = qb.subQuery()
                        .select(_this.getMetadata().targetName + "." + _this.getMetadata().materializedPathColumn.propertyPath, "path")
                        .from(_this.getMetadata().target, _this.getMetadata().targetName)
                        .whereInIds(_this.getMetadata().getEntityIdMap(entity));
                    qb.setNativeParameters(subQuery.expressionMap.nativeParameters);
                    if (_this.manager.connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver) {
                        return alias + "." + _this.getMetadata().materializedPathColumn.propertyPath + " LIKE " + subQuery.getQuery() + " || '%'";
                    }
                    else {
                        return alias + "." + _this.getMetadata().materializedPathColumn.propertyPath + " LIKE CONCAT(" + subQuery.getQuery() + ", '%')";
                    }
                });
            }
            throw new Error("Supported only in tree entities");
        },
        findAncestors: function (entity) {
            return this
                .createAncestorsQueryBuilder("treeEntity", "treeClosure", entity)
                .getMany();
        },
        findAncestorsTree: function (entity) {
            var _this = this;
            // todo: throw exception if there is no column of this relation?
            return this
                .createAncestorsQueryBuilder("treeEntity", "treeClosure", entity)
                .getRawAndEntities()
                .then(function (entitiesAndScalars) {
                var relationMaps = createRelationMaps(_this.getMetadata(), "treeEntity", entitiesAndScalars.raw);
                buildParentEntityTree(_this.getMetadata(), entity, entitiesAndScalars.entities, relationMaps);
                return entity;
            });
        },
        countAncestors: function (entity) {
            return this
                .createAncestorsQueryBuilder("treeEntity", "treeClosure", entity)
                .getCount();
        },
        createAncestorsQueryBuilder: function (alias, closureTableAlias, entity) {
            // create shortcuts for better readability
            // const escape = (alias: string) => this.manager.connection.driver.escape(alias);
            var _this = this;
            if (this.getMetadata().treeType === "closure-table") {
                var joinCondition = this.getMetadata().closureJunctionTable.ancestorColumns.map(function (column) {
                    return closureTableAlias + "." + column.propertyPath + " = " + alias + "." + column.referencedColumn.propertyPath;
                }).join(" AND ");
                var parameters_3 = {};
                var whereCondition = this.getMetadata().closureJunctionTable.descendantColumns.map(function (column) {
                    parameters_3[column.referencedColumn.propertyName] = column.referencedColumn.getEntityValue(entity);
                    return closureTableAlias + "." + column.propertyPath + " = :" + column.referencedColumn.propertyName;
                }).join(" AND ");
                return this
                    .createQueryBuilder(alias)
                    .innerJoin(this.getMetadata().closureJunctionTable.tableName, closureTableAlias, joinCondition)
                    .where(whereCondition)
                    .setParameters(parameters_3);
            }
            else if (this.getMetadata().treeType === "nested-set") {
                var joinCondition = "joined." + this.getMetadata().nestedSetLeftColumn.propertyPath + " BETWEEN " +
                    alias + "." + this.getMetadata().nestedSetLeftColumn.propertyPath + " AND " + alias + "." + this.getMetadata().nestedSetRightColumn.propertyPath;
                var parameters_4 = {};
                var whereCondition = this.getMetadata().treeParentRelation.joinColumns.map(function (joinColumn) {
                    var parameterName = joinColumn.referencedColumn.propertyPath.replace(".", "_");
                    parameters_4[parameterName] = joinColumn.referencedColumn.getEntityValue(entity);
                    return "joined." + joinColumn.referencedColumn.propertyPath + " = :" + parameterName;
                }).join(" AND ");
                return this
                    .createQueryBuilder(alias)
                    .innerJoin(this.getMetadata().targetName, "joined", joinCondition)
                    .where(whereCondition, parameters_4);
            }
            else if (this.getMetadata().treeType === "materialized-path") {
                // example: SELECT * FROM category category WHERE (SELECT mpath FROM `category` WHERE id = 2) LIKE CONCAT(category.mpath, '%');
                return this
                    .createQueryBuilder(alias)
                    .where(function (qb) {
                    var subQuery = qb.subQuery()
                        .select(_this.getMetadata().targetName + "." + _this.getMetadata().materializedPathColumn.propertyPath, "path")
                        .from(_this.getMetadata().target, _this.getMetadata().targetName)
                        .whereInIds(_this.getMetadata().getEntityIdMap(entity));
                    qb.setNativeParameters(subQuery.expressionMap.nativeParameters);
                    if (_this.manager.connection.driver instanceof AbstractSqliteDriver_1.AbstractSqliteDriver) {
                        return subQuery.getQuery() + " LIKE " + alias + "." + _this.getMetadata().materializedPathColumn.propertyPath + " || '%'";
                    }
                    else {
                        return subQuery.getQuery() + " LIKE CONCAT(" + alias + "." + _this.getMetadata().materializedPathColumn.propertyPath + ", '%')";
                    }
                });
            }
            throw new Error("Supported only in tree entities");
        } });
}
exports.createLiteralTreeRepository = createLiteralTreeRepository;

//# sourceMappingURL=LiteralTreeRepository.js.map
