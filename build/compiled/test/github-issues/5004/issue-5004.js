"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai_1 = require("chai");
var src_1 = require("../../../src");
var Foo_1 = require("./entity/Foo");
describe("github issues > #5004 expireAfterSeconds 0 can't be passed to Index decorator", function () {
    it("should allow expireAfterSeconds 0 to be passed to Index decorator", function () {
        var metadataArgsStorage = src_1.getMetadataArgsStorage();
        var fooIndices = metadataArgsStorage.indices.filter(function (indice) { return indice.target === Foo_1.Foo; });
        chai_1.expect(fooIndices.length).to.eql(1);
        chai_1.expect(fooIndices[0].expireAfterSeconds).to.eql(0);
    });
});
//# sourceMappingURL=issue-5004.js.map