import { Connection } from "../connection/Connection";
import { QueryRunner } from "../query-runner/QueryRunner";
import { EntityManager } from "./EntityManager";
/**
 * Helps to create entity managers.
 */
export declare class EntityManagerFactory {
    /**
     * Creates a new entity manager depend on a given connection's driver.
     */
    create(connection: Connection, queryRunner?: QueryRunner): EntityManager;
}
