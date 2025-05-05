import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { FindUserValidator } from "src/infra/validators/user/find.validator";
import { DeleteUserUsecase } from "src/usecase/user/delete.usecase";




@Controller("users")
export class DeleteUserController {
    constructor(private readonly deleteUserUseCase: DeleteUserUsecase) {};


    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() params: FindUserValidator) {
        await this.deleteUserUseCase.execute(params);
        return;
    };
};