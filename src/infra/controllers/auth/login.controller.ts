import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthLoginUsecase } from "src/usecase/auth/login.usecase";
import { Response } from "express";
import { AuthLoginValidator } from "src/infra/validators/auth/login.validator";

@Controller("auth/login")
export class AuthLoginController {
    constructor(private readonly authLoginUsecase: AuthLoginUsecase) {};


    @Post()
    @HttpCode(204)
    async login(@Body() body: AuthLoginValidator, @Res() res: Response) {
        const response = await this.authLoginUsecase.execute(body);

        res.cookie("nt.token", response.token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        });

        return res.status(204).send();
    };
};