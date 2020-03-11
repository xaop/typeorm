import { EntityTarget } from "../index";
/**
 */
export declare class EntityMetadataNotFoundError extends Error {
    name: string;
    constructor(target: EntityTarget<any>);
}
