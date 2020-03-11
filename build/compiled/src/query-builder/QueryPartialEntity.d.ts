/**
 * Make all properties in T optional
 */
export declare type QueryPartialEntity<T> = {
    [P in keyof T]?: T[P] | (() => string);
};
/**
 * Make all properties in T optional. Deep version.
 */
export declare type QueryDeepPartialEntity<T> = {
    [P in keyof T]?: T[P];
};
