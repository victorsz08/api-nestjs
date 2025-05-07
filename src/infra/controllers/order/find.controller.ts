import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FindOrderValidator } from "../../../infra/validators/order/find.validator";
import { FindOrderUsecase } from "../../../usecase/order/find.usecase";





@Controller("orders")
export class FindOrderController {
    constructor(private readonly findOrderUsecase: FindOrderUsecase) {};

    @Get(":id")
    @HttpCode(200)
    async find(@Param() params: FindOrderValidator) {
        const response = await this.findOrderUsecase.execute(params);

        return response;
    };
};