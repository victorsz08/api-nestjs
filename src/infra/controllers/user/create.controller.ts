import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { Roles } from "src/domain/decorators/role.decorator";
import { Role } from "src/domain/enum/role.enum";
import { CreateUserValidator } from "src/infra/validators/user/create.validator";
import { CreateUserUsecase } from "src/usecase/user/create.usecase";






@Controller("users")
export class CreateUserController {
    constructor(private readonly createUserUSecase: CreateUserUsecase) {};

    @Post()
    @HttpCode(204)
    @Roles(Role.ADMIN)
    async create(@Body() body: CreateUserValidator) {
        await this.createUserUSecase.execute(body);
        
        return;
    };
};