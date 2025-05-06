import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReportEntity, ReportCompletionEntity } from "src/domain/entities/report.entity";
import { ReportInterface } from "src/domain/interface/report.interface";
import { PrismaService } from "./prisma.service";
import { StatusEnum } from "src/domain/enum/status.enum";





@Injectable()
export class ReportService implements ReportInterface {
    constructor(private readonly repository: PrismaService) { };

    async getReports(userId: string, startDate: Date, endDate: Date): Promise<ReportEntity> {
        const user = await this.repository.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        const ordersConnected = await this.repository.contract.findMany({
            where: {
                user: {
                    id: userId
                },
                createdAt: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
                status: {
                    contains: StatusEnum.CONNECTED, mode: "insensitive"
                }
            },
        });

        const countCancelled = await this.repository.contract.count({
            where: {
                user: {
                    id: userId
                },
                createdAt: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
                status: {
                    contains: StatusEnum.PENDING, mode: "insensitive"
                }
            },
        });

        const sales = await this.repository.contract.count({
            where: {
                user: {
                    id: userId
                },
                createdAt: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
            },
        });

        const revenue = ordersConnected.reduce((acc, item) => acc + item.price, 0);
        const completionRate = ordersConnected.length / (countCancelled + ordersConnected.length);
        const cancelledRate = countCancelled / (countCancelled + ordersConnected.length);

        return {
            sales,
            revenue,
            cancelledRate,
            completionRate
        };
    };

    async getReportPerDay(userId: string, startDate: Date, endDate: Date): Promise<ReportCompletionEntity[]> {
        const user = await this.repository.user.findUnique({ where: { id: userId }});

        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        const contracts = await this.repository.contract.findMany({
            where: {
                user: {
                    id: userId
                },
                installationDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                installationDate: true,
                status: true,
            },
        });

        const reportMap: Record<string, { connecteds: number; cancelleds: number }> = {};

        contracts.forEach(contract => {
            const day = contract.installationDate.toISOString().slice(0, 10);
            if (!reportMap[day]) {
                reportMap[day] = { connecteds: 0, cancelleds: 0 };
            }
            if (contract.status === 'connected') {
                reportMap[day].connecteds += 1;
            }
            if (contract.status === 'cancelled') {
                reportMap[day].cancelleds += 1;
            }
        });

        // Transforma em array ordenado por dia
        const reportPerDay = Object.entries(reportMap)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([day, { connecteds, cancelleds }]) => ({
                day,
                connecteds,
                cancelleds,
            }));


        const reportList: ReportCompletionEntity[] = reportPerDay.map((report) => ({
            day: report.day,
            connected: report.connecteds,
            cancelled: report.cancelleds
        }));

        return reportList
    };
};