/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Reverts last migration command.
 */
export declare class MigrationRevertCommand implements yargs.CommandModule {
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
        transaction: {
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
