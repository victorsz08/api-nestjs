import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { NoteInterface } from "src/domain/interface/note.interface";




export type UpdateNoteInputDto = {
    id: string;
    content: string;
};

export type UpdateNoteOutputDto = void;


@Injectable()
export class UpdateNoteUseCase implements Usecase<UpdateNoteInputDto, UpdateNoteOutputDto> {
    constructor(private readonly noteInterface: NoteInterface) {};
    
    async execute(input: UpdateNoteInputDto): Promise<void> {
        const { id, content } = input;

        await this.noteInterface.update(id, content);
        return;
    };
};