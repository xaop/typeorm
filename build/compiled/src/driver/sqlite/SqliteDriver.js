"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DriverPackageNotInstalledError_1 = require("../../error/DriverPackageNotInstalledError");
var SqliteQueryRunner_1 = require("./SqliteQueryRunner");
var DriverOptionNotSetError_1 = require("../../error/DriverOptionNotSetError");
var PlatformTools_1 = require("../../platform/PlatformTools");
var AbstractSqliteDriver_1 = require("../sqlite-abstract/AbstractSqliteDriver");
/**
 * Organizes communication with sqlite DBMS.
 */
var SqliteDriver = /** @class */ (function (_super) {
    tslib_1.__extends(SqliteDriver, _super);
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function SqliteDriver(connection) {
        var _this = _super.call(this, connection) || this;
        _this.connection = connection;
        _this.options = connection.options;
        _this.database = _this.options.database;
        // validate options to make sure everything is set
        if (!_this.options.database)
            throw new DriverOptionNotSetError_1.DriverOptionNotSetError("database");
        // load sqlite package
        _this.loadDependencies();
        return _this;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Closes connection with database.
     */
    SqliteDriver.prototype.disconnect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (ok, fail) {
                        _this.queryRunner = undefined;
                        _this.databaseConnection.close(function (err) { return err ? fail(err) : ok(); });
                    })];
            });
        });
    };
    /**
     * Creates a query runner used to execute database queries.
     */
    SqliteDriver.prototype.createQueryRunner = function (mode) {
        if (mode === void 0) { mode = "master"; }
        if (!this.queryRunner)
            this.queryRunner = new SqliteQueryRunner_1.SqliteQueryRunner(this);
        return this.queryRunner;
    };
    SqliteDriver.prototype.normalizeType = function (column) {
        if (column.type === Buffer) {
            return "blob";
        }
        return _super.prototype.normalizeType.call(this, column);
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates connection with the database.
     */
    SqliteDriver.prototype.createDatabaseConnection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            // Internal function to run a command on the connection and fail if an error occured.
            function run(line) {
                return new Promise(function (ok, fail) {
                    databaseConnection.run(line, function (err) {
                        if (err)
                            return fail(err);
                        ok();
                    });
                });
            }
            var databaseConnection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createDatabaseDirectory(this.options.database)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (ok, fail) {
                                var connection = new _this.sqlite.Database(_this.options.database, function (err) {
                                    if (err)
                                        return fail(err);
                                    ok(connection);
                                });
                            })];
                    case 2:
                        databaseConnection = _a.sent();
                        // we need to enable foreign keys in sqlite to make sure all foreign key related features
                        // working properly. this also makes onDelete to work with sqlite.
                        return [4 /*yield*/, run("PRAGMA foreign_keys = ON;")];
                    case 3:
                        // we need to enable foreign keys in sqlite to make sure all foreign key related features
                        // working properly. this also makes onDelete to work with sqlite.
                        _a.sent();
                        if (!this.options.key) return [3 /*break*/, 5];
                        return [4 /*yield*/, run("PRAGMA key = " + JSON.stringify(this.options.key) + ";")];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, databaseConnection];
                }
            });
        });
    };
    /**
     * If driver dependency is not given explicitly, then try to load it via "require".
     */
    SqliteDriver.prototype.loadDependencies = function () {
        try {
            this.sqlite = PlatformTools_1.PlatformTools.load("sqlite3").verbose();
        }
        catch (e) {
            throw new DriverPackageNotInstalledError_1.DriverPackageNotInstalledError("SQLite", "sqlite3");
        }
    };
    /**
     * Auto creates database directory if it does not exist.
     */
    SqliteDriver.prototype.createDatabaseDirectory = function (fullPath) {
        return new Promise(function (resolve, reject) {
            var mkdirp = PlatformTools_1.PlatformTools.load("mkdirp");
            var path = PlatformTools_1.PlatformTools.load("path");
            mkdirp(path.dirname(fullPath), function (err) { return err ? reject(err) : resolve(); });
        });
    };
    return SqliteDriver;
}(AbstractSqliteDriver_1.AbstractSqliteDriver));
exports.SqliteDriver = SqliteDriver;
//# sourceMappingURL=SqliteDriver.js.map