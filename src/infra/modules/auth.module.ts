import { Module } from "@nestjs/common";
import { AuthLoginController } from "../controllers/auth/login.controller";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../prisma/auth.repository.prisma";
import { AuthInterface } from "src/domain/interface/auth.interface";
import { AuthLoginUsecase } from "src/usecase/auth/login.usecase";




@Module({
    controllers: [AuthLoginController],
    providers: [
        PrismaService,
        AuthService,
        {
            provide: AuthInterface,
            useClass: AuthService
        },
        AuthLoginUsecase
    ]
})

export class AuthModule {};