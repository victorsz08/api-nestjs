import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { ReportInterface } from "src/domain/interface/report.interface";
import { ReportCompletionEntity } from "src/domain/entities/report.entity";



export type GetReportPerDayInputDto = {
    userId: string;
    startDate: Date;
    endDate: Date;
};

export type GetReportPerDayOutputDto = {
    reports: {
        day: string;
        connected: number;
        cancelled: number;
    }[];
};

@Injectable()
export class GetReportPerDayUsecase implements Usecase<GetReportPerDayInputDto, GetReportPerDayOutputDto> {
    constructor(private readonly reportInterface: ReportInterface) {};
    
    async execute(input: GetReportPerDayInputDto): Promise<GetReportPerDayOutputDto> {
        const { userId, startDate, endDate } = input;

        const reports = await this.reportInterface.getReportPerDay(userId, startDate, endDate);
        const output = this.present(reports);

        return output;
    };

    private present(data: ReportCompletionEntity[]): GetReportPerDayOutputDto {
        return {
            reports: data.map((report) => ({
                day: report.day,
                connected: report.connected,
                cancelled: report.cancelled
            }))
        };
    };
};