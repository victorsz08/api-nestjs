import { IsNotEmpty } from "class-validator";


export class ListUserValidator {
    @IsNotEmpty({ message: "O parametro page é obrigatório" })
    page: number;

    @IsNotEmpty({ message: "O parametro limit é obrigatório" })
    limit: number;

    search?: string;
};