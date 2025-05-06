import { IsNotEmpty } from "class-validator";


export class UpdatePasswordValidator {
    @IsNotEmpty({ message: "Senha atual inválida" })
    currentPassword: string;

    @IsNotEmpty({ message: "Nova senha não pode ser vazio" })
    newPassword: string;
};