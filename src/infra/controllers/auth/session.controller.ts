import { Controller, Get, HttpCode, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserEntity } from "../../../domain/entities/user.entity";

interface RequestCustom extends Request {
    user: Partial<UserEntity>;
};


@Controller("auth/session")
export class AuthSessionController {
    @Get()
    @HttpCode(200)
    async session(@Req() req: RequestCustom, @Res() res: Response) {
        const response = req.user;
        return response;
    };
};