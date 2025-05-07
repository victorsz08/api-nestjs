import { Body, Controller, HttpCode, Param, Post } from "@nestjs/common";
import { CreateNoteValidator, FindUserNoteValidator } from "../../../infra/validators/note/create.validator";
import { CreateNoteUseCase } from "../../../usecase/note/create.usecase";




@Controller("notes")
export class CreateNoteController {
    constructor(private readonly createNoteUsecase: CreateNoteUseCase) {};


    @Post(":userId")
    @HttpCode(204)
    async create(@Param() params: FindUserNoteValidator, @Body() body: CreateNoteValidator) {
        const { userId } = params;
        const { content } = body;

        await this.createNoteUsecase.execute({ userId, content });
        return;
    };
};