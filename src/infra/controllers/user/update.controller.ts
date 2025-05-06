import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindUserValidator } from "src/infra/validators/user/find.validator";
import { UpdateUserValidator } from "src/infra/validators/user/update.validator";
import { UpdateUserUsecase } from "src/usecase/user/update.usecase";




@Controller("users")
export class UpdateUserController {
    constructor(private readonly updateUserUseCase: UpdateUserUsecase) {};

    @Put(":id")
    @HttpCode(204)
    async update(@Param() params: FindUserValidator, @Body() body: UpdateUserValidator) {
        const { id } = params;
        const { username, firstName, lastName } = body;
        
        await this.updateUserUseCase.execute({ id, username, firstName, lastName });
        return;
    };
};