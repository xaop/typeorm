"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var Post_1 = require("./entity/Post");
var Author_1 = require("./entity/Author");
var Photo_1 = require("./entity/Photo");
var Tag_1 = require("./entity/Tag");
var Counters_1 = require("./entity/Counters");
function prepareData(manager) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var photo1, photo2, user1, user2, tag1, tag2, tag3, post1, post2, post3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    photo1 = new Photo_1.Photo();
                    photo1.filename = "saw.jpg";
                    photo1.description = "Me and saw";
                    return [4 /*yield*/, manager.save(photo1)];
                case 1:
                    _a.sent();
                    photo2 = new Photo_1.Photo();
                    photo2.filename = "chain.jpg";
                    photo2.description = "Me and chain";
                    return [4 /*yield*/, manager.save(photo2)];
                case 2:
                    _a.sent();
                    user1 = new Author_1.Author();
                    user1.firstName = "Timber";
                    user1.lastName = "Saw";
                    user1.age = 25;
                    user1.photos = [photo1, photo2];
                    return [4 /*yield*/, manager.save(user1)];
                case 3:
                    _a.sent();
                    user2 = new Author_1.Author();
                    user2.firstName = "Gyro";
                    user2.lastName = "Copter";
                    user2.age = 52;
                    user2.photos = [];
                    return [4 /*yield*/, manager.save(user2)];
                case 4:
                    _a.sent();
                    tag1 = new Tag_1.Tag();
                    tag1.name = "category #1";
                    return [4 /*yield*/, manager.save(tag1)];
                case 5:
                    _a.sent();
                    tag2 = new Tag_1.Tag();
                    tag2.name = "category #2";
                    return [4 /*yield*/, manager.save(tag2)];
                case 6:
                    _a.sent();
                    tag3 = new Tag_1.Tag();
                    tag3.name = "category #3";
                    return [4 /*yield*/, manager.save(tag3)];
                case 7:
                    _a.sent();
                    post1 = new Post_1.Post();
                    post1.title = "Post #1";
                    post1.text = "About post #1";
                    post1.author = user1;
                    post1.tags = [tag1, tag2];
                    post1.counters = new Counters_1.Counters();
                    post1.counters.likes = 1;
                    post1.counters.likedUsers = [user1];
                    return [4 /*yield*/, manager.save(post1)];
                case 8:
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.title = "Post #2";
                    post2.text = "About post #2";
                    post2.author = user1;
                    post2.tags = [tag2];
                    post2.counters = new Counters_1.Counters();
                    post2.counters.likes = 2;
                    post2.counters.likedUsers = [user1, user2];
                    return [4 /*yield*/, manager.save(post2)];
                case 9:
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.title = "Post #3";
                    post3.text = "About post #3";
                    post3.author = user2;
                    post3.tags = [tag1];
                    post3.counters = new Counters_1.Counters();
                    post3.counters.likes = 1;
                    post3.counters.likedUsers = [user2];
                    return [4 /*yield*/, manager.save(post3)];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.prepareData = prepareData;
//# sourceMappingURL=find-options-test-utils.js.map