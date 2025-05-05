import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ListUserValidator } from "src/infra/validators/user/list.validator";
import { ListUserUsecase } from "src/usecase/user/list.usecase";



@Controller("users")
export class ListUserController {
    constructor(private readonly listUserUseCase: ListUserUsecase) {};


    @Get()
    @HttpCode(200)
    async list(@Query() query: ListUserValidator) {
        const response = await this.listUserUseCase.execute(query);

        return response;
    };
};