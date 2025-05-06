import { ReportCompletionEntity, ReportEntity } from "../entities/report.entity";



export abstract class ReportInterface {
    abstract getReports(userId: string, startDate: Date, endDate: Date): Promise<ReportEntity>;
    abstract getReportPerDay(userId: string, startDate: Date, endDate: Date): Promise<ReportCompletionEntity[]>;
};