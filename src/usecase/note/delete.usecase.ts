import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { NoteInterface } from "../../domain/interface/note.interface";




export type DeleteNoteInputDto = {
    id: string;
};

export type DeleteNoteOutputDto = void;



@Injectable()
export class DeleteNoteUseCase implements Usecase<DeleteNoteInputDto, DeleteNoteOutputDto> {
    constructor(private readonly noteInterface: NoteInterface) {};

    async execute(input: DeleteNoteInputDto): Promise<void> {
        const { id } = input;

        await this.noteInterface.delete(id);
        return;
    };
};