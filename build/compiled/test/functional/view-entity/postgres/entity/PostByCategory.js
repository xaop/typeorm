"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ViewColumn_1 = require("../../../../../src/decorator/columns/ViewColumn");
var ViewEntity_1 = require("../../../../../src/decorator/entity-view/ViewEntity");
var Category_1 = require("./Category");
var Post_1 = require("./Post");
var PostByCategory = /** @class */ (function () {
    function PostByCategory() {
    }
    tslib_1.__decorate([
        ViewColumn_1.ViewColumn(),
        tslib_1.__metadata("design:type", String)
    ], PostByCategory.prototype, "categoryName", void 0);
    tslib_1.__decorate([
        ViewColumn_1.ViewColumn(),
        tslib_1.__metadata("design:type", Number)
    ], PostByCategory.prototype, "postCount", void 0);
    PostByCategory = tslib_1.__decorate([
        ViewEntity_1.ViewEntity({
            materialized: true,
            expression: function (connection) { return connection.createQueryBuilder()
                .select("category.name", "categoryName")
                .addSelect("COUNT(post.id)", "postCount")
                .from(Post_1.Post, "post")
                .innerJoin(Category_1.Category, "category", "category.id = post.categoryId")
                .groupBy("category.name"); }
        })
    ], PostByCategory);
    return PostByCategory;
}());
exports.PostByCategory = PostByCategory;
//# sourceMappingURL=PostByCategory.js.map