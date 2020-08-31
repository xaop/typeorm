import * as tslib_1 from "tslib";
import { hash } from "../util/StringUtils";
import { OracleDriver } from "./oracle/OracleDriver";
/**
 * Common driver utility functions.
 */
var DriverUtils = /** @class */ (function () {
    function DriverUtils() {
    }
    // -------------------------------------------------------------------------
    // Public Static Methods
    // -------------------------------------------------------------------------
    /**
     * Normalizes and builds a new driver options.
     * Extracts settings from connection url and sets to a new options object.
     */
    DriverUtils.buildDriverOptions = function (options, buildOptions) {
        if (options.url) {
            var parsedUrl = this.parseConnectionUrl(options.url);
            var urlDriverOptions = {
                type: parsedUrl.type,
                host: parsedUrl.host,
                username: parsedUrl.username,
                password: parsedUrl.password,
                port: parsedUrl.port,
                database: parsedUrl.database
            };
            if (buildOptions && buildOptions.useSid) {
                urlDriverOptions.sid = parsedUrl.database;
            }
            return Object.assign({}, options, urlDriverOptions);
        }
        return Object.assign({}, options);
    };
    /**
     * Builds column alias from given alias name and column name.
     * If alias length is greater than the limit (if any) allowed by the current
     * driver, replaces it with a hashed string.
     *
     * @param driver Current `Driver`.
     * @param alias Alias part.
     * @param column Name of the column to be concatened to `alias`. (Optional)
     *
     * @return An alias allowing to select/transform the target `column`.
     */
    DriverUtils.buildColumnAlias = function (_a, alias, column, options) {
        var maxAliasLength = _a.maxAliasLength;
        var columnAliasName = column && column.length > 0 ? alias + "_" + column : alias;
        var extraNeededLength = (options || {}).extraNeededLength;
        if (maxAliasLength && extraNeededLength && extraNeededLength > 0) {
            maxAliasLength = maxAliasLength - extraNeededLength;
        }
        if (maxAliasLength &&
            maxAliasLength > 0 &&
            columnAliasName.length > maxAliasLength) {
            // Hack Julien:
            // The first char needs to be a letter. OtherWise it gives an error for the parameters (e.g: :3451hsd)
            return (columnAliasName[0] +
                (maxAliasLength > 1
                    ? hash(columnAliasName, { length: maxAliasLength - 1 })
                    : ""));
        }
        return columnAliasName;
    };
    /**
     * Build a parameter and a list of values for a 'IN' clause for Oracle.
     * This will allow more than 1000 items in the list of values for the IN clause.
     */
    DriverUtils.buildParamAndValuesForInClause = function (driver, origParam, origValues) {
        var param = origParam;
        var values = origValues;
        if (driver instanceof OracleDriver && values.length > 1000) {
            param = "(1, " + param + ")";
            values = values.map(function (v) { return "(1, " + v + ")"; });
        }
        return { param: param, values: values };
    };
    // -------------------------------------------------------------------------
    // Private Static Methods
    // -------------------------------------------------------------------------
    /**
     * Extracts connection data from the connection url.
     */
    DriverUtils.parseConnectionUrl = function (url) {
        var type = url.split(":")[0];
        var firstSlashes = url.indexOf("//");
        var preBase = url.substr(firstSlashes + 2);
        var secondSlash = preBase.indexOf("/");
        var base = secondSlash !== -1 ? preBase.substr(0, secondSlash) : preBase;
        var afterBase = secondSlash !== -1 ? preBase.substr(secondSlash + 1) : undefined;
        var lastAtSign = base.lastIndexOf("@");
        var usernameAndPassword = base.substr(0, lastAtSign);
        var hostAndPort = base.substr(lastAtSign + 1);
        var username = usernameAndPassword;
        var password = "";
        var firstColon = usernameAndPassword.indexOf(":");
        if (firstColon !== -1) {
            username = usernameAndPassword.substr(0, firstColon);
            password = usernameAndPassword.substr(firstColon + 1);
        }
        var _a = tslib_1.__read(hostAndPort.split(":"), 2), host = _a[0], port = _a[1];
        return {
            type: type,
            host: host,
            username: decodeURIComponent(username),
            password: decodeURIComponent(password),
            port: port ? parseInt(port) : undefined,
            database: afterBase || undefined
        };
    };
    return DriverUtils;
}());
export { DriverUtils };

//# sourceMappingURL=DriverUtils.js.map
