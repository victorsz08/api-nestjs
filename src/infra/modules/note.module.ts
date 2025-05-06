import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CreateNoteController } from "../controllers/note/create.controller";
import { FindNoteController } from "../controllers/note/find.controller";
import { ListNoteController } from "../controllers/note/list.controller";
import { UpdateNoteController } from "../controllers/note/update.controller";
import { DeleteNoteController } from "../controllers/note/delete.controller";
import { PrismaService } from "../prisma/prisma.service";
import { NoteService } from "../prisma/note.repository.prisma";
import { NoteInterface } from "src/domain/interface/note.interface";
import { CreateNoteUseCase } from "src/usecase/note/create.usecase";
import { FindNoteUsecase } from "src/usecase/note/find.usecase";
import { ListNoteUsecase } from "src/usecase/note/list.usecase";
import { UpdateNoteUseCase } from "src/usecase/note/update.usecase";
import { DeleteNoteUseCase } from "src/usecase/note/delete.usecase";
import { LoggerMiddleware } from "src/middleware/logger.middleware";




@Module({
    controllers: [
        CreateNoteController,
        FindNoteController,
        ListNoteController,
        UpdateNoteController,
        DeleteNoteController
    ],
    providers: [
        PrismaService,
        NoteService,
        {
            provide: NoteInterface,
            useClass: NoteService
        },
        CreateNoteUseCase,
        FindNoteUsecase,
        ListNoteUsecase,
        UpdateNoteUseCase,
        DeleteNoteUseCase
    ]
})


export class NoteModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                CreateNoteController,
                FindNoteController,
                ListNoteController,
                UpdateNoteController,
                DeleteNoteController
            )
    }
}