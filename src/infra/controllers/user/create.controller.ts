import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateUserValidator } from "src/infra/validators/user/create.validator";
import { CreateUserUsecase } from "src/usecase/user/create.usecase";






@Controller("users")
export class CreateUserController {
    constructor(private readonly createUserUSecase: CreateUserUsecase) {};

    @Post()
    @HttpCode(204)
    async create(@Body() body: CreateUserValidator) {
        await this.createUserUSecase.execute(body);
        
        return;
    };
};