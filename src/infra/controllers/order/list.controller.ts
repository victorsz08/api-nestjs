import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ListOrderValidator } from "../../../infra/validators/order/list.validator";
import { ListOrderUsecase } from "../../../usecase/order/list.usecase";




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