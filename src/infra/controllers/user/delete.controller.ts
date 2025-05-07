import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { Roles } from "../../../domain/decorators/role.decorator";
import { Role } from "../../../domain/enum/role.enum";
import { FindUserValidator } from "../../../infra/validators/user/find.validator";
import { DeleteUserUsecase } from "../../../usecase/user/delete.usecase";




@Controller("users")
export class DeleteUserController {
    constructor(private readonly deleteUserUseCase: DeleteUserUsecase) {};


    @Delete(":id")
    @HttpCode(204)
    @Roles(Role.ADMIN)
    async delete(@Param() params: FindUserValidator) {
        await this.deleteUserUseCase.execute(params);
        return;
    };
};