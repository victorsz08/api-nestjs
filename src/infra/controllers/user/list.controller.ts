import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { Roles } from "src/domain/decorators/role.decorator";
import { Role } from "src/domain/enum/role.enum";
import { ListUserValidator } from "src/infra/validators/user/list.validator";
import { ListUserUsecase } from "src/usecase/user/list.usecase";



@Controller("users")
export class ListUserController {
    constructor(private readonly listUserUseCase: ListUserUsecase) {};


    @Get()
    @HttpCode(200)
    @Roles(Role.ADMIN)
    async list(@Query() query: ListUserValidator) {
        const response = await this.listUserUseCase.execute(query);

        return response;
    };
};