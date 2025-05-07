import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindOrderValidator } from "../../../infra/validators/order/find.validator";
import { UpdateStatusValidator } from "../../../infra/validators/order/update-status.validator";
import { UpdateStatusUsecase } from "../../../usecase/order/update-status.usecase";




@Controller("orders/status")
export class UpdateStatusController {
    constructor(private readonly updateStatusUsecase: UpdateStatusUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async updateStatus(@Param() params: FindOrderValidator, @Body() body: UpdateStatusValidator) {
        const { id } = params;
        const { status } = body;

        await this.updateStatusUsecase.execute({ id, status });
        return;
    };
};