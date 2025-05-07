import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CreateUserController } from "../controllers/user/create.controller";
import { FindUserController } from "../controllers/user/find.controller";
import { UpdateUserController } from "../controllers/user/update.controller";
import { ListUserController } from "../controllers/user/list.controller";
import { DeleteUserController } from "../controllers/user/delete.controller";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../prisma/user.repository.prisma";
import { UserInterface } from "../../domain/interface/user.interface";
import { CreateUserUsecase } from "../../usecase/user/create.usecase";
import { FindUserUsecase } from "../../usecase/user/find.usecase";
import { ListUserUsecase } from "../../usecase/user/list.usecase";
import { UpdateUserUsecase } from "../../usecase/user/update.usecase";
import { DeleteUserUsecase } from "../../usecase/user/delete.usecase";
import { LoggerMiddleware } from "../../middleware/logger.middleware";
import { UpdatePasswordController } from "../controllers/user/update-password.controller";
import { UpdatePasswordUsecase } from "../../usecase/user/update-password.usecase";




@Module({
    controllers: [
        CreateUserController,
        FindUserController,
        UpdateUserController,
        ListUserController,
        DeleteUserController,
        UpdatePasswordController
    ],
    providers: [
        PrismaService,
        UserService,
        {
            provide: UserInterface,
            useClass: UserService
        },
        CreateUserUsecase,
        FindUserUsecase,
        ListUserUsecase,
        UpdateUserUsecase,
        DeleteUserUsecase,
        UpdatePasswordUsecase
    ],
})


export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                CreateUserController,
                FindUserController,
                UpdateUserController,
                ListUserController,
                DeleteUserController,
                UpdatePasswordController
            )
    }
};