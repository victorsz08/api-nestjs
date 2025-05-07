import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CreateOrderController } from "../controllers/order/create.controller";
import { FindOrderController } from "../controllers/order/find.controller";
import { ListOrderController } from "../controllers/order/list.controller";
import { UpdateStatusController } from "../controllers/order/update-status.controller";
import { UpdateSchedulingController } from "../controllers/order/update-scheduling.controller";
import { UpdateOrderController } from "../controllers/order/update.controller";
import { DeleteOrderController } from "../controllers/order/delete.controller";
import { PrismaService } from "../prisma/prisma.service";
import { OrderService } from "../prisma/order.repository.prisma";
import { OrderInterface } from "../../domain/interface/order.interface";
import { CreateOrderUsecase } from "../../usecase/order/create.usecase";
import { FindOrderUsecase } from "../../usecase/order/find.usecase";
import { ListOrderUsecase } from "../../usecase/order/list.usecase";
import { UpdateStatusUsecase } from "../../usecase/order/update-status.usecase";
import { UpdateSchedulingUsecase } from "../../usecase/order/update-scheduling.usecase";
import { UpdateOrderUsecase } from "../../usecase/order/update.usecase";
import { DeleteOrderUsecase } from "../../usecase/order/delete.usecase";
import { LoggerMiddleware } from "../../middleware/logger.middleware";





@Module({
    controllers: [
        CreateOrderController,
        FindOrderController,
        ListOrderController,
        UpdateStatusController,
        UpdateSchedulingController,
        UpdateOrderController,
        DeleteOrderController
    ],
    providers: [
        PrismaService,
        OrderService,
        {
            provide: OrderInterface,
            useClass: OrderService
        },
        CreateOrderUsecase,
        FindOrderUsecase,
        ListOrderUsecase,
        UpdateStatusUsecase,
        UpdateSchedulingUsecase,
        UpdateOrderUsecase,
        DeleteOrderUsecase
    ]
})

export class OrderModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                CreateOrderController,
                FindOrderController,
                ListOrderController,
                UpdateStatusController,
                UpdateSchedulingController,
                UpdateOrderController,
                DeleteOrderController
            )
    }
};