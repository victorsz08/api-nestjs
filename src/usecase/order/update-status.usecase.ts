import { Injectable } from "@nestjs/common";
import { StatusEnum } from "../../domain/enum/status.enum";
import { Usecase } from "../usecase";
import { OrderInterface } from "../../domain/interface/order.interface";



export type UpdateStatusInputDto = {
    id: string;
    status: StatusEnum;
};

export type UpdateStatusOutputDto = void;



@Injectable()
export class UpdateStatusUsecase implements Usecase<UpdateStatusInputDto, UpdateStatusOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {};
    
    async execute(input: UpdateStatusInputDto): Promise<void> {
        const { id, status } = input;

        await this.orderInterface.updateStatus(id, status);
        return;
    };
};