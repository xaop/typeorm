/**
 * Value of order by in find options.
 */
export declare type FindOptionsOrderByValue = "ASC" | "DESC" | "asc" | "desc" | 1 | -1 | {
    direction?: "asc" | "desc" | "ASC" | "DESC";
    nulls?: "first" | "last" | "FIRST" | "LAST";
};
/**
 * Order by find options.
 */
export declare type FindOptionsOrder<E> = {
    [P in keyof E]?: E[P];
};
/**
 * Filters and lefts only object-type properties from the object.
 * Used in relations find options.
 */
export declare type FindOptionsRelationKeyName<E> = {
    [K in keyof E]: E[K];
};
/**
 * Flattens array type in the object.
 * Used in relations find options.
 */
export declare type FindOptionsRelationKey<E> = {
    [P in keyof E]?: E[P];
};
/**
 * Relations find options.
 */
export declare type FindOptionsRelation<E> = FindOptionsRelationKeyName<E>[] | FindOptionsRelationKey<Pick<E, FindOptionsRelationKeyName<E>>>;
/**
 * Select find options.
 */
export declare type FindOptionsSelect<E> = (keyof E)[] | {
    [P in keyof E]?: E[P];
};
/**
 * "where" in find options.
 */
export declare type FindOptionsWhereCondition<E> = {
    [P in keyof E]?: E[P];
};
/**
 * "where" in find options.
 * Includes "array where" as well.
 */
export declare type FindOptionsWhere<E> = FindOptionsWhereCondition<E> | FindOptionsWhereCondition<E>[];
/**
 * Alternative FindOperator syntax.
 */
export declare type FindAltOperator<T> = {
    $any: T[] | FindAltOperator<T>;
} | {
    $between: [T, T];
} | {
    $equal: T | FindAltOperator<T>;
} | {
    $iLike: T | FindAltOperator<T>;
} | {
    $in: T[] | FindAltOperator<T>;
} | {
    $lessThan: T | FindAltOperator<T>;
} | {
    $like: T | FindAltOperator<T>;
} | {
    $moreThan: T | FindAltOperator<T>;
} | {
    $not: T | FindAltOperator<T>;
} | {
    $raw: string;
};
/**
 * Extra options that can be applied to FindOptions.
 */
export declare type FindExtraOptions = {
    /**
     * Indicates if eager relations should be loaded or not.
     * Enabled by default.
     */
    eagerRelations?: boolean;
    /**
     * Indicates if special pagination query shall be applied to the query
     * if skip or take in conjunction with joins is used.
     * Enabled by default.
     */
    pagination?: boolean;
    /**
     * Indicates if listeners must be executed before and after the query execution.
     * Enabled by default.
     */
    listeners?: boolean;
    /**
     * Indicates if observers must be executed before and after the query execution.
     * Enabled by default.
     */
    observers?: boolean;
    /**
     * If sets to true then loads all relation ids of the entity and maps them into relation values (not relation objects).
     * If array of strings is given then loads only relation ids of the given properties.
     */
    loadRelationIds?: boolean | {
        relations?: string[];
        disableMixedMap?: boolean;
    };
};
/**
 * Advanced caching options for FindOptions.
 */
export declare type FindCacheOptions = {
    /**
     * Cache identifier.
     */
    id?: any;
    /**
     * Caching time in milliseconds.
     */
    milliseconds?: number;
};
/**
 * Set of criteria and options to return entities by.
 */
export declare type FindOptions<E> = {
    /**
     * Specifies what columns should be selected.
     * Used for partial selections.
     */
    select?: FindOptionsSelect<E>;
    /**
     * Conditions that should be applied to match entities.
     */
    where?: FindOptionsWhere<E>;
    /**
     * Order, in which entities should be ordered.
     */
    order?: FindOptionsOrder<E>;
    /**
     * Relations that needs to be loaded in a separate SQL queries.
     * If you have lot of data returned by your query then its more efficient to load it using relations instead of joins.
     */
    relations?: FindOptionsRelation<E>;
    /**
     * Query caching options.
     * Disabled by default.
     * If set to true then caching is enabled based on global options.
     * You can also provide a number of milliseconds - caching time.
     */
    cache?: boolean | number | FindCacheOptions;
    /**
     * Extra options.
     */
    options?: FindExtraOptions;
    /**
     * Enables or disables query result caching.
     */
    lock?: {
        mode: "optimistic";
        version: number | Date;
    } | {
        mode: "pessimistic_read" | "pessimistic_write" | "dirty_read";
    };
    /**
     * Offset (paginated) where from entities should be taken.
     */
    skip?: number;
    /**
     * Limit (paginated) - max number of entities should be taken.
     */
    take?: number;
};
