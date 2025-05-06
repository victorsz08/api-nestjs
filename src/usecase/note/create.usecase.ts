import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { NoteInterface } from "src/domain/interface/note.interface";
import { v4 as uuid } from "uuid";
import { NoteEntity } from "src/domain/entities/note.entity";


export type CreateNoteInputDto = {
    content: string;
    userId: string;
};

export type CreateNoteOutputDto = void;



@Injectable()
export class CreateNoteUseCase implements Usecase<CreateNoteInputDto, CreateNoteOutputDto> {
    constructor(private readonly noteInterface: NoteInterface) {};
    
    async execute(input: CreateNoteInputDto): Promise<void> {
        const { 
            content,
            userId
        } = input;

        const note: NoteEntity = {
            id: uuid(),
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await this.noteInterface.create(note);
        return;
    };
};