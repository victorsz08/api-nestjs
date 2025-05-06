import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthLoginController } from "../controllers/auth/login.controller";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../prisma/auth.repository.prisma";
import { AuthInterface } from "src/domain/interface/auth.interface";
import { AuthLoginUsecase } from "src/usecase/auth/login.usecase";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { AuthSessionController } from "../controllers/auth/session.controller";




@Module({
    controllers: [AuthLoginController, AuthSessionController],
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

export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                AuthSessionController
            )
    }
};