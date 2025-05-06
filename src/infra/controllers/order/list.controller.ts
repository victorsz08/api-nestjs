import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ListOrderValidator } from "src/infra/validators/order/list.validator";
import { ListOrderUsecase } from "src/usecase/order/list.usecase";




@Controller("orders")
export class ListOrderController {
    constructor(private readonly listOrderUsecase: ListOrderUsecase) {};

    @Get()
    @HttpCode(200)
    async list(@Query() query: ListOrderValidator) {
        const response = await this.listOrderUsecase.execute(query);

        return response;
    };
};