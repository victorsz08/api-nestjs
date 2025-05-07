import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { OrderInterface } from "../../domain/interface/order.interface";




export type UpdateSchedulingInputDto = {
    id: string;
    schedulingDate: Date;
    schedulingTime: string;
};

export type UpdateSchedulingOutputDto = void;



@Injectable()
export class UpdateSchedulingUsecase implements Usecase<UpdateSchedulingInputDto, UpdateSchedulingOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {};

    async execute(input: UpdateSchedulingInputDto): Promise<void> {
        const { id, schedulingDate, schedulingTime } = input;

        await this.orderInterface.updateSacheduling(id, schedulingDate, schedulingTime);
        return;
    };
};