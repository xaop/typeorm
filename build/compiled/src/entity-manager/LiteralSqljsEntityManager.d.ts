import { Connection } from "../connection/Connection";
import { QueryRunner } from "../query-runner/QueryRunner";
import { SqljsEntityManager } from "./SqljsEntityManager";
/**
 * A special EntityManager that includes import/export and load/save function
 * that are unique to Sql.js.
 */
export declare function createLiteralSqljsEntityManager<Entity>({connection, queryRunner}: {
    connection: Connection;
    queryRunner?: QueryRunner;
}): SqljsEntityManager;
