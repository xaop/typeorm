"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("reflect-metadata");
var Connection_1 = require("../../../../../src/connection/Connection");
describe("relations > eager relations > circular eager relations", function () {
    it("should throw error if eager: true is set on both sides of relationship", function () {
        chai_1.expect(function () {
            new Connection_1.Connection({
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [__dirname + "/entity/*{.js,.ts}"]
            });
        }).to.throw(Error);
    });
});
//# sourceMappingURL=circular-eager-relations.js.map