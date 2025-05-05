import { Injectable } from "@nestjs/common";
import { StatusEnum } from "src/domain/enum/status.enum";
import { Usecase } from "../usecase";
import { OrderInterface } from "src/domain/interface/order.interface";
import { OrderEntity } from "src/domain/entities/order.entity";




export type FindOrderInputDto = {
    id: string;
};

export type FindOrderOutputDto = {
    id: string;
    number: number;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    contact: string;
    userId: string;
    status: StatusEnum;
    createdAt: Date;
    updatedAt: Date;
};


@Injectable()
export class FindOrderUsecase implements Usecase<FindOrderInputDto, FindOrderOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {};


    async execute(input: FindOrderInputDto): Promise<FindOrderOutputDto> {
        const { id } = input;

        const order = await this.orderInterface.find(id);
        const output = this.present(order);

        return output;
    };


    private present(order: OrderEntity): FindOrderOutputDto {
        return {
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: order.schedulingDate,
            schedulingTime: order.schedulingTime,
            price: order.price,
            contact: order.contact,
            userId: order.userId,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    };
};