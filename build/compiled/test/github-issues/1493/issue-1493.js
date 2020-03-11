"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DriverUtils_1 = require("../../../src/driver/DriverUtils");
var chai_1 = require("chai");
// import {exec} from "child_process";
describe("github issues > #1493 Error parsing pg connection string", function () {
    it("should parse common connection url", function () {
        var obj = {
            username: "username",
            password: "password",
            host: "host",
            database: "database",
            port: 8888
        };
        var url = "postgres://" + obj.username + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.database;
        var options = DriverUtils_1.DriverUtils.buildDriverOptions({ url: url });
        try {
            for (var _a = tslib_1.__values(Object.keys(obj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                chai_1.expect(options[key]).to.eql(obj[key]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    });
    it("should parse url with password contains colons", function () {
        var obj = {
            username: "username",
            password: "pas:swo:rd",
            host: "host",
            database: "database",
            port: 8888
        };
        var url = "postgres://" + obj.username + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.database;
        var options = DriverUtils_1.DriverUtils.buildDriverOptions({ url: url });
        chai_1.expect(options.password).to.eql(obj.password);
    });
    it("should parse url with username and password contains at signs", function () {
        var obj = {
            username: "usern@me",
            password: "p@ssword",
            host: "host",
            database: "database",
            port: 8888
        };
        var url = "postgres://" + obj.username + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.database;
        var options = DriverUtils_1.DriverUtils.buildDriverOptions({ url: url });
        chai_1.expect(options.username).to.eql(obj.username);
        chai_1.expect(options.password).to.eql(obj.password);
    });
});
//# sourceMappingURL=issue-1493.js.map