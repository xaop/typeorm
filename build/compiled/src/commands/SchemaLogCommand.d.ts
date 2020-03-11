/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Shows sql to be executed by schema:sync command.
 */
export declare class SchemaLogCommand implements yargs.CommandModule {
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
