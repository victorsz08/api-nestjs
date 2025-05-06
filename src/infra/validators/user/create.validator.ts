import { IsNotEmpty } from "class-validator";


export class CreateUserValidator {
    @IsNotEmpty({ message: "O campo username é obrigatório" })
    username: string;

    @IsNotEmpty({ message: "O campo nome é obrigatório" })
    firstName: string;

    @IsNotEmpty({ message: "O campo sobrenome é obrigatório" })
    lastName: string;

    @IsNotEmpty({ message: "O campo senha é obrigatório" })
    password: string;
};