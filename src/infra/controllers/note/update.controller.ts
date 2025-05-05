import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { FindNoteValidator } from "src/infra/validators/note/find.validator";
import { UpdateNoteValidator } from "src/infra/validators/note/update.validator";
import { UpdateNoteUseCase } from "src/usecase/note/update.usecase";



@Controller("notes")
export class UpdateNoteController {
    constructor(private readonly updateNoteUsecase: UpdateNoteUseCase) {};

    @Put(":id")
    @HttpCode(204)
    async update(@Param() param: FindNoteValidator, @Body() body: UpdateNoteValidator) {
        const { id } = param;
        const { content } = body;

        await this.updateNoteUsecase.execute({ id, content });
        return;
    };
};