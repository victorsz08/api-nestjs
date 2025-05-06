import { IsNotEmpty } from "class-validator";


export class CreateNoteValidator {
    @IsNotEmpty({ message: "O campo conteudo é obrigatório" })
    content: string;
};


export class FindUserNoteValidator {
    @IsNotEmpty({ message: "O id do usuário é obrigatório" })
    userId: string;
};