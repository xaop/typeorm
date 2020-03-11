/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Runs migration command.
 */
export declare class MigrationRunCommand implements yargs.CommandModule {
    command: string;
    describe: string;
    aliases: string;
    builder(args: yargs.Argv): yargs.Argv<{
        connection: {
            alias: string;
            default: string;
            describe: string;
        };
    } & {
        transaction: {
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
