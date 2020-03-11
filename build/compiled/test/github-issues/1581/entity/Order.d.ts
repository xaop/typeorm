import { DeliverySlot } from "./DeliverySlot";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
export declare class Order {
    deliverySlotId: number;
    deliverySlot: DeliverySlot;
    user: User;
    enabled: boolean;
    items: OrderItem[];
}
