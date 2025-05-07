import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindOrderValidator } from "../../../infra/validators/order/find.validator";
import { UpdateSchedulingValidator } from "../../../infra/validators/order/update-scheduling.validator";
import { UpdateSchedulingUsecase } from "../../../usecase/order/update-scheduling.usecase";




@Controller("orders/scheduling")
export class UpdateSchedulingController {
    constructor(private readonly updateSchedulingUsecase: UpdateSchedulingUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async updateScheduling(@Param() params: FindOrderValidator, @Body() body: UpdateSchedulingValidator) {
        const { id } = params;
        const { schedulingDate, schedulingTime } = body;

        await this.updateSchedulingUsecase.execute({ id, schedulingDate, schedulingTime });
        return;
    };
};