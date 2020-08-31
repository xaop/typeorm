import { Driver } from "./Driver";
/**
 * Common driver utility functions.
 */
export declare class DriverUtils {
    /**
     * Normalizes and builds a new driver options.
     * Extracts settings from connection url and sets to a new options object.
     */
    static buildDriverOptions(options: any, buildOptions?: {
        useSid: boolean;
    }): any;
    /**
     * Builds column alias from given alias name and column name.
     * If alias length is greater than the limit (if any) allowed by the current
     * driver, replaces it with a hashed string.
     *
     * @param driver Current `Driver`.
     * @param alias Alias part.
     * @param column Name of the column to be concatened to `alias`. (Optional)
     *
     * @return An alias allowing to select/transform the target `column`.
     */
    static buildColumnAlias({ maxAliasLength }: Driver, alias: string, column?: string, options?: {
        extraNeededLength?: number;
    }): string;
    /**
     * Build a parameter and a list of values for a 'IN' clause for Oracle.
     * This will allow more than 1000 items in the list of values for the IN clause.
     */
    static buildParamAndValuesForInClause(driver: Driver, origParam: string, origValues: any[]): {
        param: string;
        values: any[];
    };
    /**
     * Extracts connection data from the connection url.
     */
    private static parseConnectionUrl;
}
