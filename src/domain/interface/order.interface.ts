import { OrderEntity } from "../entities/order.entity";
import { StatusEnum } from "../enum/status.enum";


export type ListOrderInput = {
    page: number;
    limit: number;
    userId: string;
    status?: StatusEnum;
    schedulingStartDate?: Date;
    schedulingEndDate?: Date;
    createdAtStartDate?: Date;
    createdAtEndDate?: Date;
    sort?: string;
};

export type  ListOrderOutput = {
    orders: OrderEntity[];
    total: number;
    pages: number;
    limit: number;
};


export abstract class OrderInterface {
    abstract create(order: OrderEntity): Promise<void>;
    abstract find(id: string): Promise<OrderEntity>;
    abstract list(input: ListOrderInput): Promise<ListOrderOutput>;
    abstract updateStatus(id: string, status: StatusEnum): Promise<void>;
    abstract updateSacheduling(id: string, schedulingDate: Date, schedulingTime: string): Promise<void>;
    abstract update(
        id: string, 
        number: number,
        local: string,
        price: number,
        contact: string,
    ): Promise<void>;
    abstract delete(id: string): Promise<void>;
};