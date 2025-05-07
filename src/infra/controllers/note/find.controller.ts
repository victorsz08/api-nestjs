import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FindNoteValidator } from "../../../infra/validators/note/find.validator";
import { FindNoteUsecase } from "../../../usecase/note/find.usecase";



@Controller("notes")
export class FindNoteController {
    constructor(private readonly findNoteUsecase: FindNoteUsecase) {};

    @Get(":id")
    @HttpCode(200)
    async find(@Param() params: FindNoteValidator) {
        const response = await this.findNoteUsecase.execute(params);
        
        return response;
    };
};