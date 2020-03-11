"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var Post_1 = require("./entity/Post");
var test_utils_1 = require("../../../../utils/test-utils");
var PostWithoutTypes_1 = require("./entity/PostWithoutTypes");
var FruitEnum_1 = require("./enum/FruitEnum");
describe("database schema > column types > sqlite", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        enabledDrivers: ["sqlite"],
                    })];
                case 1:
                    connections = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("all types should work correctly - persist and hydrate", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var postRepository, queryRunner, table, post, loadedPost;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    post = new Post_1.Post();
                    post.id = 1;
                    post.name = "Post";
                    post.integer = 2147483647;
                    post.int = 2147483647;
                    post.int2 = 32767;
                    post.int8 = 8223372036854775807;
                    post.tinyint = 127;
                    post.smallint = 32767;
                    post.mediumint = 8388607;
                    post.bigint = 8223372036854775807;
                    post.unsignedBigInt = 8223372036854775807;
                    post.character = "A";
                    post.varchar = "This is varchar";
                    post.varyingCharacter = "This is varying character";
                    post.nchar = "This is nchar";
                    post.nativeCharacter = "This is native character";
                    post.nvarchar = "This is nvarchar";
                    post.blob = new Buffer("This is blob");
                    post.clob = "This is clob";
                    post.text = "This is text";
                    post.real = 10.5;
                    post.double = 10.1234;
                    post.doublePrecision = 10.1234;
                    post.float = 10.53;
                    post.numeric = 10;
                    post.decimal = 50;
                    post.boolean = true;
                    post.date = "2017-06-21";
                    post.datetime = new Date();
                    post.datetime.setMilliseconds(0);
                    post.simpleArray = ["A", "B", "C"];
                    post.simpleJson = { param: "VALUE" };
                    post.simpleEnum = "A";
                    post.simpleClassEnum1 = FruitEnum_1.FruitEnum.Apple;
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    loadedPost.id.should.be.equal(post.id);
                    loadedPost.name.should.be.equal(post.name);
                    loadedPost.int.should.be.equal(post.int);
                    loadedPost.int2.should.be.equal(post.int2);
                    loadedPost.int8.should.be.equal(post.int8);
                    loadedPost.tinyint.should.be.equal(post.tinyint);
                    loadedPost.smallint.should.be.equal(post.smallint);
                    loadedPost.mediumint.should.be.equal(post.mediumint);
                    loadedPost.bigint.should.be.equal(post.bigint);
                    loadedPost.unsignedBigInt.should.be.equal(post.unsignedBigInt);
                    loadedPost.character.should.be.equal(post.character);
                    loadedPost.varchar.should.be.equal(post.varchar);
                    loadedPost.varyingCharacter.should.be.equal(post.varyingCharacter);
                    loadedPost.nchar.should.be.equal(post.nchar);
                    loadedPost.nativeCharacter.should.be.equal(post.nativeCharacter);
                    loadedPost.nvarchar.should.be.equal(post.nvarchar);
                    loadedPost.text.should.be.equal(post.text);
                    loadedPost.blob.toString().should.be.equal(post.blob.toString());
                    loadedPost.clob.should.be.equal(post.clob);
                    loadedPost.real.should.be.equal(post.real);
                    loadedPost.double.should.be.equal(post.double);
                    loadedPost.doublePrecision.should.be.equal(post.doublePrecision);
                    loadedPost.float.should.be.equal(post.float);
                    loadedPost.numeric.should.be.equal(post.numeric);
                    loadedPost.decimal.should.be.equal(post.decimal);
                    loadedPost.date.should.be.equal(post.date);
                    loadedPost.boolean.should.be.equal(post.boolean);
                    loadedPost.date.should.be.equal(post.date);
                    loadedPost.datetime.valueOf().should.be.equal(post.datetime.valueOf());
                    loadedPost.simpleArray[0].should.be.equal(post.simpleArray[0]);
                    loadedPost.simpleArray[1].should.be.equal(post.simpleArray[1]);
                    loadedPost.simpleArray[2].should.be.equal(post.simpleArray[2]);
                    loadedPost.simpleJson.param.should.be.equal(post.simpleJson.param);
                    loadedPost.simpleEnum.should.be.equal(post.simpleEnum);
                    loadedPost.simpleClassEnum1.should.be.equal(post.simpleClassEnum1);
                    table.findColumnByName("id").type.should.be.equal("integer");
                    table.findColumnByName("name").type.should.be.equal("varchar");
                    table.findColumnByName("int").type.should.be.equal("integer");
                    table.findColumnByName("int2").type.should.be.equal("int2");
                    table.findColumnByName("int8").type.should.be.equal("int8");
                    table.findColumnByName("tinyint").type.should.be.equal("tinyint");
                    table.findColumnByName("smallint").type.should.be.equal("smallint");
                    table.findColumnByName("mediumint").type.should.be.equal("mediumint");
                    table.findColumnByName("bigint").type.should.be.equal("bigint");
                    table.findColumnByName("unsignedBigInt").type.should.be.equal("unsigned big int");
                    table.findColumnByName("character").type.should.be.equal("character");
                    table.findColumnByName("varchar").type.should.be.equal("varchar");
                    table.findColumnByName("varyingCharacter").type.should.be.equal("varying character");
                    table.findColumnByName("nchar").type.should.be.equal("nchar");
                    table.findColumnByName("nativeCharacter").type.should.be.equal("native character");
                    table.findColumnByName("nvarchar").type.should.be.equal("nvarchar");
                    table.findColumnByName("text").type.should.be.equal("text");
                    table.findColumnByName("blob").type.should.be.equal("blob");
                    table.findColumnByName("clob").type.should.be.equal("clob");
                    table.findColumnByName("real").type.should.be.equal("real");
                    table.findColumnByName("double").type.should.be.equal("double");
                    table.findColumnByName("doublePrecision").type.should.be.equal("double precision");
                    table.findColumnByName("float").type.should.be.equal("float");
                    table.findColumnByName("numeric").type.should.be.equal("numeric");
                    table.findColumnByName("decimal").type.should.be.equal("decimal");
                    table.findColumnByName("boolean").type.should.be.equal("boolean");
                    table.findColumnByName("date").type.should.be.equal("date");
                    table.findColumnByName("datetime").type.should.be.equal("datetime");
                    table.findColumnByName("simpleArray").type.should.be.equal("text");
                    table.findColumnByName("simpleJson").type.should.be.equal("text");
                    table.findColumnByName("simpleEnum").type.should.be.equal("simple-enum");
                    table.findColumnByName("simpleEnum").enum[0].should.be.equal("A");
                    table.findColumnByName("simpleEnum").enum[1].should.be.equal("B");
                    table.findColumnByName("simpleEnum").enum[2].should.be.equal("C");
                    table.findColumnByName("simpleClassEnum1").type.should.be.equal("simple-enum");
                    table.findColumnByName("simpleClassEnum1").enum[0].should.be.equal("apple");
                    table.findColumnByName("simpleClassEnum1").enum[1].should.be.equal("pineapple");
                    table.findColumnByName("simpleClassEnum1").enum[2].should.be.equal("banana");
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("all types should work correctly - persist and hydrate when types are not specified on columns", function () { return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var postRepository, queryRunner, table, post, loadedPost;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(PostWithoutTypes_1.PostWithoutTypes);
                    queryRunner = connection.createQueryRunner();
                    return [4 /*yield*/, queryRunner.getTable("post_without_types")];
                case 1:
                    table = _a.sent();
                    return [4 /*yield*/, queryRunner.release()];
                case 2:
                    _a.sent();
                    post = new PostWithoutTypes_1.PostWithoutTypes();
                    post.id = 1;
                    post.name = "Post";
                    post.boolean = true;
                    post.blob = new Buffer("A");
                    post.datetime = new Date();
                    post.datetime.setMilliseconds(0);
                    return [4 /*yield*/, postRepository.save(post)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.findOne(1)];
                case 4:
                    loadedPost = (_a.sent());
                    loadedPost.id.should.be.equal(post.id);
                    loadedPost.name.should.be.equal(post.name);
                    loadedPost.boolean.should.be.equal(post.boolean);
                    loadedPost.blob.toString().should.be.equal(post.blob.toString());
                    loadedPost.datetime.valueOf().should.be.equal(post.datetime.valueOf());
                    table.findColumnByName("id").type.should.be.equal("integer");
                    table.findColumnByName("name").type.should.be.equal("varchar");
                    table.findColumnByName("boolean").type.should.be.equal("boolean");
                    table.findColumnByName("blob").type.should.be.equal("blob");
                    table.findColumnByName("datetime").type.should.be.equal("datetime");
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=column-types-sqlite.js.map