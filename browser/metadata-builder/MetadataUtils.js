/**
 * Metadata args utility functions.
 */
var MetadataUtils = /** @class */ (function () {
    function MetadataUtils() {
    }
    /**
     * Gets given's entity all inherited classes.
     * Gives in order from parents to children.
     * For example Post extends ContentModel which extends Unit it will give
     * [Unit, ContentModel, Post]
     */
    MetadataUtils.getInheritanceTree = function (entity) {
        var tree = [entity];
        var getPrototypeOf = function (object) {
            var proto = Object.getPrototypeOf(object);
            if (proto && proto.name) {
                tree.push(proto);
                getPrototypeOf(proto);
            }
        };
        getPrototypeOf(entity);
        return tree;
    };
    /**
     * Checks if this table is inherited from another table.
     */
    MetadataUtils.isInherited = function (target1, target2) {
        return target1.prototype instanceof target2;
    };
    /**
     * Filters given array of targets by a given classes.
     * If classes are not given, then it returns array itself.
     */
    MetadataUtils.filterByTarget = function (array, classes) {
        if (!classes)
            return array;
        return array.filter(function (item) { return item.target && classes.indexOf(item.target) !== -1; });
    };
    return MetadataUtils;
}());
export { MetadataUtils };

//# sourceMappingURL=MetadataUtils.js.map
