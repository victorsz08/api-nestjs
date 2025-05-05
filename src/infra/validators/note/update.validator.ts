import { IsNotEmpty } from "class-validator";




export class UpdateNoteValidator {
    @IsNotEmpty({ message: "O campo conteudo é obrigatório" })
    content: string;
};