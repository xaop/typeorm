"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post_1 = require("../entity/Post");
var connection_1 = require("../connection");
exports.PostRepository = connection_1.Sample33CustomRepositoryConnection
    .getRepository(Post_1.Post)
    .extend({
    findMyPost: function () {
        return this.findOne();
    }
});
//# sourceMappingURL=PostRepository.js.map