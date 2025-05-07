import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { FindNoteValidator } from "../../../infra/validators/note/find.validator";
import { DeleteNoteUseCase } from "../../../usecase/note/delete.usecase";




@Controller("notes")
export class DeleteNoteController {
    constructor(private readonly deleteNoteUsecase: DeleteNoteUseCase) {};

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param() params: FindNoteValidator) {
        await this.deleteNoteUsecase.execute(params);

        return;
    };
};