"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var Post_1 = require("./entity/Post");
var Author_1 = require("./entity/Author");
var PostRepository_1 = require("./repository/PostRepository");
var User_1 = require("./entity/User");
var connection_1 = require("./connection");
// testing dynamic options set
connection_1.Sample33CustomRepositoryConnection.setOptions({
    entities: [Post_1.Post, Author_1.Author, User_1.User],
});
connection_1.Sample33CustomRepositoryConnection.connect().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var post, loadedPost;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post = PostRepository_1.PostRepository.create();
                post.title = "Hello Custom Repositories!";
                return [4 /*yield*/, PostRepository_1.PostRepository.save(post)];
            case 1:
                _a.sent();
                return [4 /*yield*/, PostRepository_1.PostRepository.findMyPost()];
            case 2:
                loadedPost = _a.sent();
                console.log("Post persisted! Loaded post: ", loadedPost);
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) { return console.log("Error: ", error); });
//# sourceMappingURL=app.js.map