import { IsNotEmpty } from "class-validator";



export class GetReportValidator {
    @IsNotEmpty({ message: "id do usuário é obrigatório" })
    userId: string;

    @IsNotEmpty({ message: "Data inicial é obrigatória" })
    startDate: Date;

    @IsNotEmpty({ message: "Data final é obrigatória" })
    endDate: Date;
}