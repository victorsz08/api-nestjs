import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GetReportController } from "../controllers/report/get-report.controller";
import { GetReportPerDayController } from "../controllers/report/get-report-per-day.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ReportService } from "../prisma/report.repository.prisma";
import { ReportInterface } from "../../domain/interface/report.interface";
import { GetReportUsecase } from "../../usecase/report/get.usecase";
import { GetReportPerDayUsecase } from "../../usecase/report/per-day.usecase";
import { LoggerMiddleware } from "../../middleware/logger.middleware";



@Module({
    controllers: [
        GetReportController,
        GetReportPerDayController
    ],
    providers: [
        PrismaService,
        ReportService,
        {
            provide: ReportInterface,
            useClass: ReportService
        },
        GetReportUsecase,
        GetReportPerDayUsecase
    ]
})

export class ReportModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                GetReportController,
                GetReportPerDayController
            )
    }
}