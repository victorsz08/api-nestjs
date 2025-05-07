import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RecoveryAccessController } from "../controllers/security/recovery-access.controller";
import { GrantedAccessController } from "../controllers/security/granted-access.controller";
import { PrismaService } from "../prisma/prisma.service";
import { SecurityService } from "../prisma/security.repository.prisma";
import { SecurityInterface } from "../../domain/interface/security.inteface";
import { RecoveryAccessUsecase } from "../../usecase/security/recovery-access.usecase";
import { GrantedAccessUsecase } from "../../usecase/security/granted-access.usecase";
import { LoggerMiddleware } from "../../middleware/logger.middleware";




@Module({
    controllers: [ 
        RecoveryAccessController,
        GrantedAccessController
    ],
    providers: [
        PrismaService,
        SecurityService,
        {
            provide: SecurityInterface,
            useClass: SecurityService
        },
        RecoveryAccessUsecase,
        GrantedAccessUsecase
    ]
})

export class SecurityModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                RecoveryAccessController,
                GrantedAccessController
            )
    }
}