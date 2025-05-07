import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CreateNoteController } from "../controllers/note/create.controller";
import { FindNoteController } from "../controllers/note/find.controller";
import { ListNoteController } from "../controllers/note/list.controller";
import { UpdateNoteController } from "../controllers/note/update.controller";
import { DeleteNoteController } from "../controllers/note/delete.controller";
import { PrismaService } from "../prisma/prisma.service";
import { NoteService } from "../prisma/note.repository.prisma";
import { NoteInterface } from "../../domain/interface/note.interface";
import { CreateNoteUseCase } from "../../usecase/note/create.usecase";
import { FindNoteUsecase } from "../../usecase/note/find.usecase";
import { ListNoteUsecase } from "../../usecase/note/list.usecase";
import { UpdateNoteUseCase } from "../../usecase/note/update.usecase";
import { DeleteNoteUseCase } from "../../usecase/note/delete.usecase";
import { LoggerMiddleware } from "../../middleware/logger.middleware";




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