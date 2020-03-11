/**
 * Type to define schema of a given entity.
 */
export declare type TypedEntitySchemaProjection<T> = {
    [P in keyof T]?: T[P];
};
