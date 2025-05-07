import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { GetReportValidator } from "../../../infra/validators/reports/get.validator";
import { GetReportPerDayUsecase } from "../../../usecase/report/per-day.usecase";


@Controller("reports/perday")
export class GetReportPerDayController {
    constructor(private readonly getReportPerDayUsecase: GetReportPerDayUsecase) {};

    @Get()
    @HttpCode(200)
    async getReportPerDay(@Query() query: GetReportValidator) {
        const response = await this.getReportPerDayUsecase.execute(query);

        return response;
    };
};