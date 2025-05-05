import { IsNotEmpty } from "class-validator";
import { StatusEnum } from "src/domain/enum/status.enum";



export class ListOrderValidator {
    @IsNotEmpty({ message: 'O id do usuário é obrigatório' })
    userId: string;

    @IsNotEmpty({ message: 'A página é obrigatória' })
    page: number;

    @IsNotEmpty({ message: 'O limite é obrigatório' })
    limit: number;

    status?: StatusEnum;
    schedulingStartDate?: Date;
    schedulingEndDate?: Date;
    createdAtStartDate?: Date;
    createdAtEndDate?: Date;
    sort?: string;
};