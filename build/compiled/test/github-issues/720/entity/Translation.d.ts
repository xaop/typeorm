import { Message } from "./Message";
import { Locale } from "./Locale";
export declare class Translation {
    localeCode: string;
    messageId: number;
    locale: Locale;
    message: Message;
    text: string;
}
