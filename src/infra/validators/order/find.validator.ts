import { IsNotEmpty } from "class-validator";



export class FindOrderValidator {
    @IsNotEmpty({ message: 'O id do pedido é obrigatório' })
    id: string;
};