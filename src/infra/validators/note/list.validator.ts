import { IsNotEmpty } from "class-validator";


export class ListNoteValidator {
    @IsNotEmpty({ message: "Parametro página é oobrigatório" })
    page: number;

    @IsNotEmpty({ message: "Parametro limite é oobrigatório" })
    limit: number;

    @IsNotEmpty({ message: "Parametro id do usuário é obrigatório" })
    userId: string;

    startDate?: Date;
    endDate?: Date;
};