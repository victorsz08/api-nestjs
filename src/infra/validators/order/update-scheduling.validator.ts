import { IsNotEmpty } from "class-validator";




export class UpdateSchedulingValidator {
    @IsNotEmpty({ message: 'O id do pedido é obrigatório' })
    id: string;

    @IsNotEmpty({ message: 'A data de agendamento é obrigatória' })
    schedulingDate: Date;

    @IsNotEmpty({ message: 'O horário de agendamento é obrigatório' })
    schedulingTime: string;
};