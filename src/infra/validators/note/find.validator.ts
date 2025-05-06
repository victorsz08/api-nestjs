import { IsNotEmpty } from "class-validator";



export class FindNoteValidator {
    @IsNotEmpty({ message: "O id da nota é obrigatório" })
    id: string;
};