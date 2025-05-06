import { StatusEnum } from "../enum/status.enum";



export class OrderEntity {
    id: string;
    number: number;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    status: StatusEnum;
    price: number;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};