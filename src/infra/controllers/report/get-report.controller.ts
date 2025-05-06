import { Controller, Get, HttpCode, Param, Query } from "@nestjs/common";
import { GetReportValidator } from "src/infra/validators/reports/get.validator";
import { GetReportUsecase } from "src/usecase/report/get.usecase";




@Controller("reports")
export class GetReportController {
    constructor(private readonly getReportUsecase: GetReportUsecase) {};

    @Get(":userId")
    @HttpCode(200)
    async getReport(@Query() query: GetReportValidator) {
        const response = await this.getReportUsecase.execute(query);

        return response;
    };
};