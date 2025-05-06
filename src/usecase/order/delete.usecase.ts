import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { OrderInterface } from "src/domain/interface/order.interface";





export type DeleteOrderInputDto = {
    id: string;
};

export type DeleteOrderOutputDto = void;


@Injectable()
export class DeleteOrderUsecase implements Usecase<DeleteOrderInputDto, DeleteOrderOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {};
    
    async execute(input: DeleteOrderInputDto): Promise<void> {
        const { id } = input;

        await this.orderInterface.delete(id);
        return;
    };
};