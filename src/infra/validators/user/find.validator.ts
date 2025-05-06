import { IsNotEmpty } from "class-validator";



export class FindUserValidator {
    @IsNotEmpty({ message: "O parametro id é obrigatório" })
    id: string;
};