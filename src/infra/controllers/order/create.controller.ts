import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { CreateOrderValidator, FindUserValidator } from "../../../infra/validators/order/create.validator";
import { CreateOrderUsecase } from "../../../usecase/order/create.usecase";






@Controller("orders")
export class CreateOrderController {
    constructor(private readonly createOrderUsecase: CreateOrderUsecase) {};

    @Post(":userId")
    @HttpCode(204)
    async create(@Body() body: CreateOrderValidator, @Param() params: FindUserValidator) {
        const { userId } = params;
        const { 
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact
         } = body;

         await this.createOrderUsecase.execute({
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId
         });

         return;
    };
};