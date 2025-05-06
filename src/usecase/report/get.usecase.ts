import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { ReportInterface } from "src/domain/interface/report.interface";
import { ReportEntity } from "src/domain/entities/report.entity";



export type GetReportInpudDto = {
    userId: string;
    startDate: Date;
    endDate: Date;
};

export type GetReportOutputDto = {
    revenue: number;
    sales: number;
    completionRate: number;
    cancelledRate: number;
};


@Injectable()
export class GetReportUsecase implements Usecase<GetReportInpudDto, GetReportOutputDto> {
    constructor(private readonly reportInterface: ReportInterface) {};
    
    async execute(input: GetReportInpudDto): Promise<GetReportOutputDto> {
        const { userId, startDate, endDate } = input;

        const report = await this.reportInterface.getReports(userId, startDate, endDate);
        const output = this.present(report);

        return output;
    };

    private present(report: ReportEntity): GetReportOutputDto {
        return {
            revenue: report.revenue,
            sales: report.sales,
            completionRate: report.completionRate,
            cancelledRate: report.cancelledRate
        };
    };
};