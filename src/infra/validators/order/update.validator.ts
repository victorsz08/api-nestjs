import { IsNotEmpty } from "class-validator";




export class UpdateOrderValidator {
    @IsNotEmpty({ message: "O numero do pedido é obrigatório" })
    number: number;

    @IsNotEmpty({ message: "O local do pedido é obrigatório" })
    local: string;

    @IsNotEmpty({ message: "O preço do pedido é obrigatório" })
    price: number;

    @IsNotEmpty({ message: "O contato do pedido é obrigatório" })
    contact: string;
}