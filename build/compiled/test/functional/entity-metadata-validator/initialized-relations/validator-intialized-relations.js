"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Connection_1 = require("../../../../src/connection/Connection");
var chai_1 = require("chai");
var InitializedRelationError_1 = require("../../../../src/error/InitializedRelationError");
var Category_1 = require("./entity/Category");
var Post_1 = require("./entity/Post");
var Image_1 = require("./entity/Image");
var ImageInfo_1 = require("./entity/ImageInfo");
var Question_1 = require("./entity/Question");
var src_1 = require("../../../../src");
describe("entity-metadata-validator > initialized relations", function () {
    it("should throw error if relation with initialized array was found on many-to-many relation", function () {
        chai_1.expect(function () {
            new Connection_1.Connection({
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [Post_1.Post, Category_1.Category],
                entityFactory: new src_1.OldEntityFactory()
            });
        }).to.throw(InitializedRelationError_1.InitializedRelationError);
    });
    it("should throw error if relation with initialized array was found on one-to-many relation", function () {
        chai_1.expect(function () {
            new Connection_1.Connection({
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [Image_1.Image, ImageInfo_1.ImageInfo],
                entityFactory: new src_1.OldEntityFactory()
            });
        }).to.throw(InitializedRelationError_1.InitializedRelationError);
    });
    it("should not throw error if relation with initialized array was not found", function () {
        chai_1.expect(function () {
            new Connection_1.Connection({
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [Category_1.Category],
                entityFactory: new src_1.OldEntityFactory()
            });
        }).not.to.throw(InitializedRelationError_1.InitializedRelationError);
    });
    it("should not throw error if relation with initialized array was found, but persistence for this relation was disabled", function () {
        chai_1.expect(function () {
            new Connection_1.Connection({
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
                entities: [Question_1.Question, Category_1.Category],
                entityFactory: new src_1.OldEntityFactory()
            });
        }).not.to.throw(InitializedRelationError_1.InitializedRelationError);
    });
});
//# sourceMappingURL=validator-intialized-relations.js.map