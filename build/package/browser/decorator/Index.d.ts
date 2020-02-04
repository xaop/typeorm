import { IndexOptions } from "../";
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(options?: IndexOptions): Function;
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(name: string, options?: IndexOptions): Function;
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(name: string, options: {
    synchronize: false;
}): Function;
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(name: string, fields: string[], options?: IndexOptions): Function;
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(fields: string[], options?: IndexOptions): Function;
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(fields: (object?: any) => (any[] | {
    [key: string]: number;
}), options?: IndexOptions): Function;
/**
 * Creates a database index.
 * Can be used on entity property or on entity.
 * Can create indices with composite columns when used on entity.
 */
export declare function Index(name: string, fields: (object?: any) => (any[] | {
    [key: string]: number;
}), options?: IndexOptions): Function;
