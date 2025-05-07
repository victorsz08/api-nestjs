import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { Roles } from "../../../domain/decorators/role.decorator";
import { Role } from "../../../domain/enum/role.enum";
import { ListUserValidator } from "../../../infra/validators/user/list.validator";
import { ListUserUsecase } from "../../../usecase/user/list.usecase";



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