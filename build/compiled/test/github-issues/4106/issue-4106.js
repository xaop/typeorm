"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LiteralEntityManager_1 = require("../../../src/entity-manager/LiteralEntityManager");
var test_utils_1 = require("../../utils/test-utils");
var Human_1 = require("./entity/Human");
var Animal_1 = require("./entity/Animal");
var GenderEnum_1 = require("./entity/GenderEnum");
var chai_1 = require("chai");
describe("github issues > #4106 Specify enum type name in postgres", function () {
    var connections;
    before(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Human_1.Human, Animal_1.Animal],
                        dropSchema: true,
                        enabledDrivers: ["postgres"],
                    })];
                case 1: return [2 /*return*/, (connections = _a.sent())];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    function prepareData(connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var human, animal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        human = new Human_1.Human();
                        human.id = 1;
                        human.name = "Jane Doe";
                        human.gender = GenderEnum_1.Gender.female;
                        return [4 /*yield*/, connection.manager.save(human)];
                    case 1:
                        _a.sent();
                        animal = new Animal_1.Animal();
                        animal.id = 1;
                        animal.name = "Miko";
                        animal.specie = "Turtle";
                        animal.gender = GenderEnum_1.Gender.male;
                        return [4 /*yield*/, connection.manager.save(animal)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    it("should create an enum with the name specified in column options -> enumName", function () {
        return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var em, types;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        em = LiteralEntityManager_1.createLiteralEntityManager({ connection: connection });
                        return [4 /*yield*/, em.query("SELECT typowner, n.nspname as \"schema\",\n                    pg_catalog.format_type(t.oid, NULL) AS \"name\",\n                    pg_catalog.obj_description(t.oid, 'pg_type') as \"description\"\n                    FROM pg_catalog.pg_type t\n                        LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n                    WHERE (t.typrelid = 0 OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))\n                        AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)\n                        AND pg_catalog.pg_type_is_visible(t.oid)\n                        AND n.nspname = 'public'\n                    ORDER BY 1, 2;")];
                    case 1:
                        types = _a.sent();
                        // Enum name must be exactly the same as stated
                        // Quoted here since the name contains mixed case
                        chai_1.expect(types.some(function (type) { return type.name === "\"genderEnum\""; })).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    it("should insert data with the correct enum", function () {
        return Promise.all(connections.map(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var em, humanTable, animalTable, HumanRepository, AnimalRepository, human, animal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareData(connection)];
                    case 1:
                        _a.sent();
                        em = LiteralEntityManager_1.createLiteralEntityManager({ connection: connection });
                        return [4 /*yield*/, em.query("SELECT column_name as \"columnName\", data_type as \"dataType\", udt_name as \"udtName\" FROM information_schema.columns\n                    WHERE table_schema = 'public' AND table_name = 'human'\n                    ORDER BY ordinal_position;")];
                    case 2:
                        humanTable = _a.sent();
                        return [4 /*yield*/, em.query("SELECT column_name as \"columnName\", data_type as \"dataType\", udt_name as \"udtName\" FROM information_schema.columns\n                    WHERE table_schema = 'public' AND table_name = 'animal'\n                    ORDER BY ordinal_position;")];
                    case 3:
                        animalTable = _a.sent();
                        chai_1.expect(humanTable[2].dataType).to.equal("USER-DEFINED");
                        chai_1.expect(humanTable[2].udtName).to.equal("genderEnum");
                        chai_1.expect(animalTable[2].dataType).to.equal("USER-DEFINED");
                        chai_1.expect(animalTable[2].udtName).to.equal("genderEnum");
                        HumanRepository = connection.manager.getRepository(Human_1.Human);
                        AnimalRepository = connection.manager.getRepository(Animal_1.Animal);
                        return [4 /*yield*/, HumanRepository.find()];
                    case 4:
                        human = _a.sent();
                        return [4 /*yield*/, AnimalRepository.find()];
                    case 5:
                        animal = _a.sent();
                        chai_1.expect(human[0].gender).to.equal("female");
                        chai_1.expect(animal[0].gender).to.equal("male");
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
//# sourceMappingURL=issue-4106.js.map