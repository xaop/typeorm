/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Creates a new migration file.
 */
export declare class MigrationCreateCommand implements yargs.CommandModule {
    command: string;
    describe: string;
    aliases: string;
    builder(args: yargs.Argv): yargs.Argv<{
        c: {
            alias: string;
            default: string;
            describe: string;
        };
    } & {
        n: {
            alias: string;
            describe: string;
            demand: true;
        };
    } & {
        d: {
            alias: string;
            describe: string;
        };
    } & {
        f: {
            alias: string;
            default: string;
            describe: string;
        };
    }>;
    handler(args: yargs.Arguments): Promise<void>;
    /**
     * Gets contents of the migration file.
     */
    protected static getTemplate(name: string, timestamp: number): string;
}
