import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ListNoteValidator } from "src/infra/validators/note/list.validator";
import { ListNoteUsecase } from "src/usecase/note/list.usecase";




@Controller("notes")
export class ListNoteController {
    constructor(private readonly listNoteUsecase: ListNoteUsecase) {};

    @Get()
    @HttpCode(200)
    async list(@Query() query: ListNoteValidator) {
        const response = await this.listNoteUsecase.execute(query);

        return response;
    };
};