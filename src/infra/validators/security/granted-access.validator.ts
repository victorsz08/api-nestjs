import { IsNotEmpty } from "class-validator";
import { Role } from "src/domain/enum/role.enum";

export class GrantedAccessValidator {
    @IsNotEmpty({ message: "O campo novo cargo é obrigatório" })
    role: Role;
};