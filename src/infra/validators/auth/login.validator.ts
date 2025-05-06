import { IsNotEmpty } from "class-validator";



export class AuthLoginValidator {
    @IsNotEmpty({ message: "usuário invalido" })
    username: string;

    @IsNotEmpty({ message: "senha invalida" })
    password: string;
};