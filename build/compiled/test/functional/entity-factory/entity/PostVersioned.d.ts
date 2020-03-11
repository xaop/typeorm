export declare class PostVersioned {
    id: number;
    private title;
    version: number;
    initialized?: true;
    constructor(title: string);
    getTitle(): string;
}
