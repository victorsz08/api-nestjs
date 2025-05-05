import { IsNotEmpty } from "class-validator";
import { StatusEnum } from "src/domain/enum/status.enum";



export class UpdateStatusValidator {
    @IsNotEmpty({ message: 'O id do pedido é obrigatório' })
    id: string;

    @IsNotEmpty({ message: 'O status do pedido é obrigatório' })
    status: StatusEnum;
};