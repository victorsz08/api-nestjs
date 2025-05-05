import { NoteEntity } from "../entities/note.entity";


export type ListNoteInput = {
    page: number;
    limit: number;
    userId: string;
    startDate?: Date;
    endDate?: Date;
};

export type ListNoteOutput = {
    notes: NoteEntity[];
    total: number;
    pages: number;
    limit: number;
};


export abstract class NoteInterface {
    abstract create(note: NoteEntity): Promise<void>;
    abstract find(id: string): Promise<NoteEntity>;
    abstract list(query: ListNoteInput): Promise<ListNoteOutput>;
    abstract update(id: string, content: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
};