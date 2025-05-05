import { IsNotEmpty } from "class-validator";



export class CreateOrderValidator {
    @IsNotEmpty({ message: 'O número do pedido é obrigatório' })
    number: number;

    @IsNotEmpty({ message: 'O local do pedido é obrigatório' })
    local: string;

    @IsNotEmpty({ message: 'O preço do pedido é obrigatório' })
    price: number;

    @IsNotEmpty({ message: 'O contato do pedido é obrigatório' })
    contact: string;

    @IsNotEmpty({ message: "A data de agendamento é obrigatória" })
    schedulingDate: Date;

    @IsNotEmpty({ message: "O horário de agendamento é obrigatório" })
    schedulingTime: string;
};

export class FindUserValidator {
    @IsNotEmpty({ message: 'O id do usuário é obrigatório' })
    userId: string;
};