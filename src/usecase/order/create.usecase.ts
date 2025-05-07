import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { OrderInterface } from "../../domain/interface/order.interface";
import { v4 as uuid } from "uuid";
import { StatusEnum } from "../../domain/enum/status.enum";





export type CreateOrderInputDto = {
    number: number;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    contact: string;
    userId: string;
};

export type CreateOrderOutputDto = void;




@Injectable()
export class CreateOrderUsecase implements Usecase<CreateOrderInputDto, CreateOrderOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {};
    
    
    async execute(input: CreateOrderInputDto): Promise<void> {
        const {
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId
        } = input;

        const order = {
            id: uuid(),
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId,
            status: StatusEnum.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        };


        await this.orderInterface.create(order);
        return;            
    };
};
