import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FindUserValidator } from "../../../infra/validators/user/find.validator";
import { FindUserUsecase } from "../../../usecase/user/find.usecase";




@Controller("users")
export class FindUserController {
    constructor(private readonly  findUserUsecase: FindUserUsecase) {};


    @Get(":id")
    @HttpCode(200)
    async find(@Param() params: FindUserValidator) {
        const response = await this.findUserUsecase.execute(params);

        return response;
    };
};