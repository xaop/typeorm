import { Post } from "./Post";
export declare class Category {
    id: number;
    name: string;
    post: Promise<Post>;
}
