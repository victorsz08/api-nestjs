import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindUserValidator } from "../../../infra/validators/user/find.validator";
import { UpdatePasswordValidator } from "../../../infra/validators/user/update-password.validator";
import { UpdatePasswordUsecase } from "../../../usecase/user/update-password.usecase";




@Controller("users/updatepassword")
export class UpdatePasswordController {
    constructor(private readonly updatePasswordUsecase: UpdatePasswordUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async updatePassword(@Param() params: FindUserValidator, @Body() body: UpdatePasswordValidator) {
        const { id } = params;
        const { currentPassword, newPassword } = body;

        await this.updatePasswordUsecase.execute({ id, currentPassword,  newPassword });
        return;
    };
};