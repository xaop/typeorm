/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Synchronizes database schema with entities.
 */
export declare class SchemaSyncCommand implements yargs.CommandModule {
    command: string;
    describe: string;
    builder(args: yargs.Argv): yargs.Argv<{
        c: {
            alias: string;
            default: string;
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
}
