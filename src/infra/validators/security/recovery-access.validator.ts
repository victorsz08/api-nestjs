import { IsNotEmpty } from "class-validator";


export class RecoveryAccessValidator {
    @IsNotEmpty({ message: "Parametro id do usuário é obrigatório" })
    userId: string;
};