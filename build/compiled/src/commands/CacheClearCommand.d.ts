/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Clear cache command.
 */
export declare class CacheClearCommand implements yargs.CommandModule {
    command: string;
    describe: string;
    builder(args: yargs.Argv): yargs.Argv<{
        connection: {
            alias: string;
            default: string;
            describe: string;
        };
    } & {
        config: {
            alias: string;
            default: string;
            describe: string;
        };
    }>;
    handler(args: yargs.Arguments): Promise<void>;
}
