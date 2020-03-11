"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConnectionIsNotSetError_1 = require("../../error/ConnectionIsNotSetError");
var DriverPackageNotInstalledError_1 = require("../../error/DriverPackageNotInstalledError");
var DriverUtils_1 = require("../DriverUtils");
var SqlServerQueryRunner_1 = require("./SqlServerQueryRunner");
var DateUtils_1 = require("../../util/DateUtils");
var PlatformTools_1 = require("../../platform/PlatformTools");
var RdbmsSchemaBuilder_1 = require("../../schema-builder/RdbmsSchemaBuilder");
var MssqlParameter_1 = require("./MssqlParameter");
var OrmUtils_1 = require("../../util/OrmUtils");
var ApplyValueTransformers_1 = require("../../util/ApplyValueTransformers");
/**
 * Organizes communication with SQL Server DBMS.
 */
var SqlServerDriver = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function SqlServerDriver(connection) {
        /**
         * Pool for slave databases.
         * Used in replication.
         */
        this.slaves = [];
        /**
         * Indicates if replication is enabled.
         */
        this.isReplicated = false;
        /**
         * Indicates if tree tables are supported by this driver.
         */
        this.treeSupport = true;
        /**
         * Gets list of supported column data types by a driver.
         *
         * @see https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql
         */
        this.supportedDataTypes = [
            "int",
            "bigint",
            "bit",
            "decimal",
            "money",
            "numeric",
            "smallint",
            "smallmoney",
            "tinyint",
            "float",
            "real",
            "date",
            "datetime2",
            "datetime",
            "datetimeoffset",
            "smalldatetime",
            "time",
            "char",
            "varchar",
            "text",
            "nchar",
            "nvarchar",
            "ntext",
            "binary",
            "image",
            "varbinary",
            "hierarchyid",
            "sql_variant",
            "timestamp",
            "uniqueidentifier",
            "xml",
            "geometry",
            "geography",
            "rowversion"
        ];
        /**
         * Gets list of spatial column data types.
         */
        this.spatialTypes = [
            "geometry",
            "geography"
        ];
        /**
         * Gets list of column data types that support length by a driver.
         */
        this.withLengthColumnTypes = [
            "char",
            "varchar",
            "nchar",
            "nvarchar",
            "binary",
            "varbinary"
        ];
        /**
         * Gets list of column data types that support precision by a driver.
         */
        this.withPrecisionColumnTypes = [
            "decimal",
            "numeric",
            "time",
            "datetime2",
            "datetimeoffset"
        ];
        /**
         * Gets list of column data types that support scale by a driver.
         */
        this.withScaleColumnTypes = [
            "decimal",
            "numeric"
        ];
        /**
         * Orm has special columns and we need to know what database column types should be for those types.
         * Column types are driver dependant.
         */
        this.mappedDataTypes = {
            createDate: "datetime2",
            createDateDefault: "getdate()",
            updateDate: "datetime2",
            updateDateDefault: "getdate()",
            version: "int",
            treeLevel: "int",
            migrationId: "int",
            migrationName: "varchar",
            migrationTimestamp: "bigint",
            cacheId: "int",
            cacheIdentifier: "nvarchar",
            cacheTime: "bigint",
            cacheDuration: "int",
            cacheQuery: "nvarchar(MAX)",
            cacheResult: "nvarchar(MAX)",
            metadataType: "varchar",
            metadataDatabase: "varchar",
            metadataSchema: "varchar",
            metadataTable: "varchar",
            metadataName: "varchar",
            metadataValue: "nvarchar(MAX)",
        };
        /**
         * Default values of length, precision and scale depends on column data type.
         * Used in the cases when length/precision/scale is not specified by user.
         */
        this.dataTypeDefaults = {
            "char": { length: 1 },
            "nchar": { length: 1 },
            "varchar": { length: 255 },
            "nvarchar": { length: 255 },
            "binary": { length: 1 },
            "varbinary": { length: 1 },
            "decimal": { precision: 18, scale: 0 },
            "numeric": { precision: 18, scale: 0 },
            "time": { precision: 7 },
            "datetime2": { precision: 7 },
            "datetimeoffset": { precision: 7 }
        };
        /**
         * Max length allowed by MSSQL Server for aliases (identifiers).
         * @see https://docs.microsoft.com/en-us/sql/sql-server/maximum-capacity-specifications-for-sql-server
         */
        this.maxAliasLength = 128;
        this.connection = connection;
        this.options = connection.options;
        this.isReplicated = this.options.replication ? true : false;
        // load mssql package
        this.loadDependencies();
        // Object.assign(connection.options, DriverUtils.buildDriverOptions(connection.options)); // todo: do it better way
        // validate options to make sure everything is set
        // if (!this.options.host)
        // throw new DriverOptionNotSetError("host");
        // if (!this.options.username)
        //     throw new DriverOptionNotSetError("username");
        // if (!this.options.database)
        //     throw new DriverOptionNotSetError("database");
    }
    // -------------------------------------------------------------------------
    // Public Implemented Methods
    // -------------------------------------------------------------------------
    /**
     * Performs connection to the database.
     * Based on pooling options, it can either create connection immediately,
     * either create a pool and create connection when needed.
     */
    SqlServerDriver.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.options.replication) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.options.replication.slaves.map(function (slave) {
                                return _this.createPool(_this.options, slave);
                            }))];
                    case 1:
                        _a.slaves = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this.createPool(this.options, this.options.replication.master)];
                    case 2:
                        _b.master = _d.sent();
                        this.database = this.options.replication.master.database;
                        return [3 /*break*/, 5];
                    case 3:
                        _c = this;
                        return [4 /*yield*/, this.createPool(this.options, this.options)];
                    case 4:
                        _c.master = _d.sent();
                        this.database = this.options.database;
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Makes any action after connection (e.g. create extensions in Postgres driver).
     */
    SqlServerDriver.prototype.afterConnect = function () {
        return Promise.resolve();
    };
    /**
     * Closes connection with the database.
     */
    SqlServerDriver.prototype.disconnect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.master)
                            return [2 /*return*/, Promise.reject(new ConnectionIsNotSetError_1.ConnectionIsNotSetError("mssql"))];
                        return [4 /*yield*/, this.closePool(this.master)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(this.slaves.map(function (slave) { return _this.closePool(slave); }))];
                    case 2:
                        _a.sent();
                        this.master = undefined;
                        this.slaves = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Closes connection pool.
     */
    SqlServerDriver.prototype.closePool = function (pool) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (ok, fail) {
                        pool.close(function (err) { return err ? fail(err) : ok(); });
                    })];
            });
        });
    };
    /**
     * Creates a schema builder used to build and sync a schema.
     */
    SqlServerDriver.prototype.createSchemaBuilder = function () {
        return new RdbmsSchemaBuilder_1.RdbmsSchemaBuilder(this.connection);
    };
    /**
     * Creates a query runner used to execute database queries.
     */
    SqlServerDriver.prototype.createQueryRunner = function (mode) {
        if (mode === void 0) { mode = "master"; }
        return new SqlServerQueryRunner_1.SqlServerQueryRunner(this, mode);
    };
    /**
     * Replaces parameters in the given sql with special escaping character
     * and an array of parameter names to be passed to a query.
     */
    SqlServerDriver.prototype.escapeQueryWithParameters = function (sql, parameters, nativeParameters) {
        var escapedParameters = Object.keys(nativeParameters).map(function (key) { return nativeParameters[key]; });
        if (!parameters || !Object.keys(parameters).length)
            return [sql, escapedParameters];
        var keys = Object.keys(parameters).map(function (parameter) { return "(:(\\.\\.\\.)?" + parameter + "\\b)"; }).join("|");
        sql = sql.replace(new RegExp(keys, "g"), function (key) {
            var value;
            var isArray = false;
            if (key.substr(0, 4) === ":...") {
                isArray = true;
                value = parameters[key.substr(4)];
            }
            else {
                value = parameters[key.substr(1)];
            }
            if (isArray) {
                return value.map(function (v) {
                    escapedParameters.push(v);
                    return "@" + (escapedParameters.length - 1);
                }).join(", ");
            }
            else if (value instanceof Function) {
                return value();
            }
            else {
                escapedParameters.push(value);
                return "@" + (escapedParameters.length - 1);
            }
        }); // todo: make replace only in value statements, otherwise problems
        return [sql, escapedParameters];
    };
    /**
     * Escapes a column name.
     */
    SqlServerDriver.prototype.escape = function (columnName) {
        return "\"" + columnName + "\"";
    };
    /**
     * Build full table name with database name, schema name and table name.
     * E.g. "myDB"."mySchema"."myTable"
     */
    SqlServerDriver.prototype.buildTableName = function (tableName, schema, database) {
        var fullName = tableName;
        if (schema)
            fullName = schema + "." + tableName;
        if (database) {
            if (!schema) {
                fullName = database + ".." + tableName;
            }
            else {
                fullName = database + "." + fullName;
            }
        }
        return fullName;
    };
    /**
     * Prepares given value to a value to be persisted, based on its column type and metadata.
     */
    SqlServerDriver.prototype.preparePersistentValue = function (value, columnMetadata) {
        if (columnMetadata.transformer)
            value = ApplyValueTransformers_1.ApplyValueTransformers.transformTo(columnMetadata.transformer, value);
        if (value === null || value === undefined)
            return value;
        if (columnMetadata.type === Boolean) {
            return value === true ? 1 : 0;
        }
        else if (columnMetadata.type === "date") {
            return DateUtils_1.DateUtils.mixedDateToDate(value);
        }
        else if (columnMetadata.type === "time") {
            return DateUtils_1.DateUtils.mixedTimeToDate(value);
        }
        else if (columnMetadata.type === "datetime"
            || columnMetadata.type === "smalldatetime"
            || columnMetadata.type === Date) {
            return DateUtils_1.DateUtils.mixedDateToDate(value, false, false);
        }
        else if (columnMetadata.type === "datetime2"
            || columnMetadata.type === "datetimeoffset") {
            return DateUtils_1.DateUtils.mixedDateToDate(value, false, true);
        }
        else if (columnMetadata.type === "simple-array") {
            return DateUtils_1.DateUtils.simpleArrayToString(value);
        }
        else if (columnMetadata.type === "simple-json") {
            return DateUtils_1.DateUtils.simpleJsonToString(value);
        }
        else if (columnMetadata.type === "simple-enum") {
            return DateUtils_1.DateUtils.simpleEnumToString(value);
        }
        return value;
    };
    /**
     * Prepares given value to a value to be persisted, based on its column type or metadata.
     */
    SqlServerDriver.prototype.prepareHydratedValue = function (value, columnMetadata) {
        if (value === null || value === undefined)
            return columnMetadata.transformer ? ApplyValueTransformers_1.ApplyValueTransformers.transformFrom(columnMetadata.transformer, value) : value;
        if (columnMetadata.type === Boolean) {
            value = value ? true : false;
        }
        else if (columnMetadata.type === "datetime"
            || columnMetadata.type === Date
            || columnMetadata.type === "datetime2"
            || columnMetadata.type === "smalldatetime"
            || columnMetadata.type === "datetimeoffset") {
            value = DateUtils_1.DateUtils.normalizeHydratedDate(value);
        }
        else if (columnMetadata.type === "date") {
            value = DateUtils_1.DateUtils.mixedDateToDateString(value);
        }
        else if (columnMetadata.type === "time") {
            value = DateUtils_1.DateUtils.mixedTimeToString(value);
        }
        else if (columnMetadata.type === "simple-array") {
            value = DateUtils_1.DateUtils.stringToSimpleArray(value);
        }
        else if (columnMetadata.type === "simple-json") {
            value = DateUtils_1.DateUtils.stringToSimpleJson(value);
        }
        else if (columnMetadata.type === "simple-enum") {
            value = DateUtils_1.DateUtils.stringToSimpleEnum(value, columnMetadata);
        }
        if (columnMetadata.transformer)
            value = ApplyValueTransformers_1.ApplyValueTransformers.transformFrom(columnMetadata.transformer, value);
        return value;
    };
    /**
     * Creates a database type from a given column metadata.
     */
    SqlServerDriver.prototype.normalizeType = function (column) {
        if (column.type === Number || column.type === "integer") {
            return "int";
        }
        else if (column.type === String) {
            return "nvarchar";
        }
        else if (column.type === Date) {
            return "datetime";
        }
        else if (column.type === Boolean) {
            return "bit";
        }
        else if (column.type === Buffer) {
            return "binary";
        }
        else if (column.type === "uuid") {
            return "uniqueidentifier";
        }
        else if (column.type === "simple-array" || column.type === "simple-json") {
            return "ntext";
        }
        else if (column.type === "simple-enum") {
            return "nvarchar";
        }
        else if (column.type === "dec") {
            return "decimal";
        }
        else if (column.type === "double precision") {
            return "float";
        }
        else if (column.type === "rowversion") {
            return "timestamp"; // the rowversion type's name in SQL server metadata is timestamp
        }
        else {
            return column.type || "";
        }
    };
    /**
     * Normalizes "default" value of the column.
     */
    SqlServerDriver.prototype.normalizeDefault = function (columnMetadata) {
        var defaultValue = columnMetadata.default;
        if (typeof defaultValue === "number") {
            return "" + defaultValue;
        }
        else if (typeof defaultValue === "boolean") {
            return defaultValue === true ? "1" : "0";
        }
        else if (typeof defaultValue === "function") {
            return /*"(" + */ defaultValue() /* + ")"*/;
        }
        else if (typeof defaultValue === "string") {
            return "'" + defaultValue + "'";
        }
        else {
            return defaultValue;
        }
    };
    /**
     * Normalizes "isUnique" value of the column.
     */
    SqlServerDriver.prototype.normalizeIsUnique = function (column) {
        return column.entityMetadata.uniques.some(function (uq) { return uq.columns.length === 1 && uq.columns[0] === column; });
    };
    /**
     * Returns default column lengths, which is required on column creation.
     */
    SqlServerDriver.prototype.getColumnLength = function (column) {
        if (column.length)
            return column.length.toString();
        if (column.type === "varchar" || column.type === "nvarchar" || column.type === String)
            return "255";
        return "";
    };
    /**
     * Creates column type definition including length, precision and scale
     */
    SqlServerDriver.prototype.createFullType = function (column) {
        var type = column.type;
        // used 'getColumnLength()' method, because SqlServer sets `varchar` and `nvarchar` length to 1 by default.
        if (this.getColumnLength(column)) {
            type += "(" + this.getColumnLength(column) + ")";
        }
        else if (column.precision !== null && column.precision !== undefined && column.scale !== null && column.scale !== undefined) {
            type += "(" + column.precision + "," + column.scale + ")";
        }
        else if (column.precision !== null && column.precision !== undefined) {
            type += "(" + column.precision + ")";
        }
        if (column.isArray)
            type += " array";
        return type;
    };
    /**
     * Obtains a new database connection to a master server.
     * Used for replication.
     * If replication is not setup then returns default connection's database connection.
     */
    SqlServerDriver.prototype.obtainMasterConnection = function () {
        return Promise.resolve(this.master);
    };
    /**
     * Obtains a new database connection to a slave server.
     * Used for replication.
     * If replication is not setup then returns master (default) connection's database connection.
     */
    SqlServerDriver.prototype.obtainSlaveConnection = function () {
        if (!this.slaves.length)
            return this.obtainMasterConnection();
        var random = Math.floor(Math.random() * this.slaves.length);
        return Promise.resolve(this.slaves[random]);
    };
    /**
     * Creates generated map of values generated or returned by database after INSERT query.
     */
    SqlServerDriver.prototype.createGeneratedMap = function (metadata, insertResult) {
        var _this = this;
        if (!insertResult)
            return undefined;
        return Object.keys(insertResult).reduce(function (map, key) {
            var column = metadata.findColumnWithDatabaseName(key);
            if (column) {
                OrmUtils_1.OrmUtils.mergeDeep(map, column.createValueMap(_this.prepareHydratedValue(insertResult[key], column)));
            }
            return map;
        }, {});
    };
    /**
     * Differentiate columns of this table and columns from the given column metadatas columns
     * and returns only changed.
     */
    SqlServerDriver.prototype.findChangedColumns = function (tableColumns, columnMetadatas) {
        var _this = this;
        return columnMetadatas.filter(function (columnMetadata) {
            var tableColumn = tableColumns.find(function (c) { return c.name === columnMetadata.databaseName; });
            if (!tableColumn)
                return false; // we don't need new columns, we only need exist and changed
            return tableColumn.name !== columnMetadata.databaseName
                || tableColumn.type !== _this.normalizeType(columnMetadata)
                || tableColumn.length !== columnMetadata.length
                || tableColumn.precision !== columnMetadata.precision
                || tableColumn.scale !== columnMetadata.scale
                // || tableColumn.comment !== columnMetadata.comment || // todo
                || (!tableColumn.isGenerated // we included check for generated here, because generated columns already can have default values
                    && _this.lowerDefaultValueIfNessesary(_this.normalizeDefault(columnMetadata)) !== _this.lowerDefaultValueIfNessesary(tableColumn.default)
                    && !(_this.normalizeDefault(columnMetadata) === null && typeof tableColumn.default === "undefined"))
                || tableColumn.isPrimary !== columnMetadata.isPrimary
                || tableColumn.isNullable !== columnMetadata.isNullable
                || tableColumn.isUnique !== _this.normalizeIsUnique(columnMetadata)
                || tableColumn.isGenerated !== columnMetadata.isGenerated;
        });
    };
    SqlServerDriver.prototype.lowerDefaultValueIfNessesary = function (value) {
        // SqlServer saves function calls in default value as lowercase #2733
        if (!value) {
            return value;
        }
        return value.split("'").map(function (v, i) {
            return i % 2 === 1 ? v : v.toLowerCase();
        }).join("'");
    };
    /**
     * Returns true if driver supports RETURNING / OUTPUT statement.
     */
    SqlServerDriver.prototype.isReturningSqlSupported = function () {
        if (this.options.options && this.options.options.disableOutputReturning) {
            return false;
        }
        return true;
    };
    /**
     * Returns true if driver supports uuid values generation on its own.
     */
    SqlServerDriver.prototype.isUUIDGenerationSupported = function () {
        return true;
    };
    /**
     * Creates an escaped parameter.
     */
    SqlServerDriver.prototype.createParameter = function (parameterName, index) {
        return "@" + index;
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Sql server's parameters needs to be wrapped into special object with type information about this value.
     * This method wraps given value into MssqlParameter based on its column definition.
     */
    SqlServerDriver.prototype.parametrizeValue = function (column, value) {
        // if its already MssqlParameter then simply return it
        if (value instanceof MssqlParameter_1.MssqlParameter)
            return value;
        var normalizedType = this.normalizeType({ type: column.type });
        if (column.length) {
            return new MssqlParameter_1.MssqlParameter(value, normalizedType, column.length);
        }
        else if (column.precision !== null && column.precision !== undefined && column.scale !== null && column.scale !== undefined) {
            return new MssqlParameter_1.MssqlParameter(value, normalizedType, column.precision, column.scale);
        }
        else if (column.precision !== null && column.precision !== undefined) {
            return new MssqlParameter_1.MssqlParameter(value, normalizedType, column.precision);
        }
        else if (column.scale !== null && column.scale !== undefined) {
            return new MssqlParameter_1.MssqlParameter(value, normalizedType, column.scale);
        }
        return new MssqlParameter_1.MssqlParameter(value, normalizedType);
    };
    /**
     * Sql server's parameters needs to be wrapped into special object with type information about this value.
     * This method wraps all values of the given object into MssqlParameter based on their column definitions in the given table.
     */
    SqlServerDriver.prototype.parametrizeMap = function (tablePath, map) {
        var _this = this;
        // find metadata for the given table
        if (!this.connection.hasMetadata(tablePath))
            return map;
        var metadata = this.connection.getMetadata(tablePath);
        return Object.keys(map).reduce(function (newMap, key) {
            var value = map[key];
            // find column metadata
            var column = metadata.findColumnWithDatabaseName(key);
            if (!column)
                return value;
            newMap[key] = _this.parametrizeValue(column, value);
            return newMap;
        }, {});
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    SqlServerDriver.prototype.loadDependencies = function () {
        try {
            this.mssql = PlatformTools_1.PlatformTools.load("mssql");
        }
        catch (e) {
            throw new DriverPackageNotInstalledError_1.DriverPackageNotInstalledError("SQL Server", "mssql");
        }
    };
    /**
     * Creates a new connection pool for a given database credentials.
     */
    SqlServerDriver.prototype.createPool = function (options, credentials) {
        var _this = this;
        credentials = Object.assign({}, credentials, DriverUtils_1.DriverUtils.buildDriverOptions(credentials)); // todo: do it better way
        // build connection options for the driver
        var connectionOptions = Object.assign({}, {
            connectionTimeout: this.options.connectionTimeout,
            requestTimeout: this.options.requestTimeout,
            stream: this.options.stream,
            pool: this.options.pool,
            options: this.options.options,
        }, {
            server: credentials.host,
            user: credentials.username,
            password: credentials.password,
            database: credentials.database,
            port: credentials.port,
            domain: credentials.domain,
        }, options.extra || {});
        // set default useUTC option if it hasn't been set
        if (!connectionOptions.options)
            connectionOptions.options = { useUTC: false };
        else if (!connectionOptions.options.useUTC)
            connectionOptions.options.useUTC = false;
        // pooling is enabled either when its set explicitly to true,
        // either when its not defined at all (e.g. enabled by default)
        return new Promise(function (ok, fail) {
            var pool = new _this.mssql.ConnectionPool(connectionOptions);
            var logger = _this.connection.logger;
            var poolErrorHandler = (options.pool && options.pool.errorHandler) || (function (error) { return logger.log("warn", "MSSQL pool raised an error. " + error); });
            /*
              Attaching an error handler to pool errors is essential, as, otherwise, errors raised will go unhandled and
              cause the hosting app to crash.
             */
            pool.on("error", poolErrorHandler);
            var connection = pool.connect(function (err) {
                if (err)
                    return fail(err);
                ok(connection);
            });
        });
    };
    return SqlServerDriver;
}());
exports.SqlServerDriver = SqlServerDriver;
//# sourceMappingURL=SqlServerDriver.js.map