import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindOrderValidator } from "../../../infra/validators/order/find.validator";
import { UpdateOrderValidator } from "../../../infra/validators/order/update.validator";
import { UpdateOrderUsecase } from "../../../usecase/order/update.usecase";





@Controller("orders")
export class UpdateOrderController {
    constructor(private readonly updateOrderUsecase: UpdateOrderUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async update(@Param() params: FindOrderValidator, @Body() body: UpdateOrderValidator) {
        const { id } = params;
        const { 
            number,
            local,
            contact,
            price
        } = body;

        await this.updateOrderUsecase.execute({ id, number, local, contact, price });
        return;
    };
};