/// <reference types="yargs" />
import * as yargs from "yargs";
/**
 * Generates a new subscriber.
 */
export declare class SubscriberCreateCommand implements yargs.CommandModule {
    command: string;
    describe: string;
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
     * Gets contents of the entity file.
     */
    protected static getTemplate(name: string): string;
}
