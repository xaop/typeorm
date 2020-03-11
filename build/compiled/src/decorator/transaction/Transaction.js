"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require("../../");
function Transaction(connectionOrOptions) {
    return function (target, methodName, descriptor) {
        // save original method - we gonna need it
        var originalMethod = descriptor.value;
        // override method descriptor with proxy method
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var connectionName = "default";
            var isolationLevel = undefined;
            if (connectionOrOptions) {
                if (typeof connectionOrOptions === "string") {
                    connectionName = connectionOrOptions;
                }
                else {
                    if (connectionOrOptions.connectionName) {
                        connectionName = connectionOrOptions.connectionName;
                    }
                    if (connectionOrOptions.isolation) {
                        isolationLevel = connectionOrOptions.isolation;
                    }
                }
            }
            var transactionCallback = function (entityManager) {
                var argsWithInjectedTransactionManagerAndRepositories;
                // filter all @TransactionEntityManager() and @TransactionRepository() decorator usages for this method
                var transactionEntityManagerMetadatas = _1.getMetadataArgsStorage()
                    .filterTransactionEntityManagers(target.constructor, methodName)
                    .reverse();
                var transactionRepositoryMetadatas = _1.getMetadataArgsStorage()
                    .filterTransactionRepository(target.constructor, methodName)
                    .reverse();
                // if there are @TransactionEntityManager() decorator usages the inject them
                if (transactionEntityManagerMetadatas.length > 0) {
                    argsWithInjectedTransactionManagerAndRepositories = tslib_1.__spread(args);
                    // replace method params with injection of transactionEntityManager
                    transactionEntityManagerMetadatas.forEach(function (metadata) {
                        argsWithInjectedTransactionManagerAndRepositories.splice(metadata.index, 0, entityManager);
                    });
                }
                else if (transactionRepositoryMetadatas.length === 0) {
                    argsWithInjectedTransactionManagerAndRepositories = tslib_1.__spread([entityManager], args);
                }
                else {
                    argsWithInjectedTransactionManagerAndRepositories = tslib_1.__spread(args);
                }
                // for every usage of @TransactionRepository decorator
                transactionRepositoryMetadatas.forEach(function (metadata) {
                    var repositoryInstance;
                    // detect type of the repository and get instance from transaction entity manager
                    switch (metadata.repositoryType) {
                        case "Repository":
                            repositoryInstance = entityManager.getRepository(metadata.entityType);
                            break;
                        case "MongoRepository":
                            repositoryInstance = entityManager.getMongoRepository(metadata.entityType);
                            break;
                        case "TreeRepository":
                            repositoryInstance = entityManager.getTreeRepository(metadata.entityType);
                            break;
                        // if not the TypeORM's ones, there must be custom repository classes
                        default:
                            repositoryInstance = entityManager.getCustomRepository(metadata.repositoryType);
                    }
                    // replace method param with injection of repository instance
                    argsWithInjectedTransactionManagerAndRepositories.splice(metadata.index, 0, repositoryInstance);
                });
                return originalMethod.apply(_this, argsWithInjectedTransactionManagerAndRepositories);
            };
            if (isolationLevel) {
                return _1.getConnection(connectionName).manager.transaction(isolationLevel, transactionCallback);
            }
            else {
                return _1.getConnection(connectionName).manager.transaction(transactionCallback);
            }
        };
    };
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map