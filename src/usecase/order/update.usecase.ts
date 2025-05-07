import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { OrderInterface } from "../../domain/interface/order.interface";



export type UpdateOrderInputDto = {
    id: string;
    number: number;
    local: string;
    price: number;
    contact: string;
};

export type UpdateOrderOutputDto = void;



@Injectable()
export class UpdateOrderUsecase implements Usecase<UpdateOrderInputDto, UpdateOrderOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {};
    
    async execute(input: UpdateOrderInputDto): Promise<void> {
        const { id, number, local, price, contact } = input;

        await this.orderInterface.update(id, number, local, price, contact);
        return;
    };
};