import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { ListNoteOutput, NoteInterface } from "src/domain/interface/note.interface";




export type ListNoteInputDto = {
    page: number;
    limit: number;
    userId: string;
    startDate?: Date;
    endDate?: Date;
};


export type ListNoteOutputDto = {
    notes:  {
        id: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
    pages: number;
    limit: number;
};


@Injectable()
export class ListNoteUsecase implements Usecase<ListNoteInputDto, ListNoteOutputDto> {
    constructor(private readonly noteInterface: NoteInterface) {};

    async execute(input: ListNoteInputDto): Promise<ListNoteOutputDto> {
        const { page, limit, userId, startDate, endDate } = input;

        const notes = await this.noteInterface.list({ page, limit, userId, startDate, endDate });
        
        const output = this.present(notes);
        return output;
    };

    private present(data: ListNoteOutput): ListNoteOutputDto {
        return {
            notes: data.notes.map(note => ({
                id: note.id,
                content: note.content,
                userId: note.userId,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            })),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    };
};