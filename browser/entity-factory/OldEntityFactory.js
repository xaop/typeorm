var OldEntityFactory = /** @class */ (function () {
    function OldEntityFactory() {
    }
    /**
     * Returns an entity object
     */
    OldEntityFactory.prototype.createEntity = function (target) {
        return new target();
    };
    return OldEntityFactory;
}());
export { OldEntityFactory };

//# sourceMappingURL=OldEntityFactory.js.map
