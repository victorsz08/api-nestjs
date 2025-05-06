import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { FindOrderValidator } from "src/infra/validators/order/find.validator";
import { DeleteOrderUsecase } from "src/usecase/order/delete.usecase";




@Controller("orders")
export class DeleteOrderController {
    constructor(private readonly deleteOrderUsecase: DeleteOrderUsecase) {};

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() params: FindOrderValidator) {
        const { id } = params;

        await this.deleteOrderUsecase.execute({ id });
        return;
    };
};