import { StatusEnum } from "../../domain/enum/status.enum";
import { ListOrderOutput, OrderInterface } from "../../domain/interface/order.interface";
import { Usecase } from "../usecase";



export type ListOrderInputDto = {
    page: number;
    limit: number;
    userId: string;
    status?: StatusEnum;
    schedulingStartDate?: Date;
    schedulingEndDate?: Date;
    createdAtStartDate?: Date;
    createdAtEndDate?: Date;
    sort?: string;
};

export type ListOrderOutputDto = {
    orders: {
        id: string;
        number: number;
        local: string;
        schedulingDate: Date;
        schedulingTime: string;
        price: number;
        contact: string;
        userId: string;
        status: StatusEnum;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
    pages: number;
    limit: number;
};



export class ListOrderUsecase implements Usecase<ListOrderInputDto, ListOrderOutputDto> {
    constructor(private readonly orderInterface: OrderInterface) {}
    
    async execute(input: ListOrderInputDto): Promise<ListOrderOutputDto> {
        const { 
            page,
            limit,
            userId,
            status,
            schedulingStartDate,
            schedulingEndDate,
            createdAtStartDate,
            createdAtEndDate,
            sort
        } = input;

        const data= await this.orderInterface.list({
            page,
            limit,
            userId,
            status,
            schedulingStartDate,
            schedulingEndDate,
            createdAtStartDate,
            createdAtEndDate,
            sort
        });

        const output = this.present(data);
        return output;
    };

    private present(data: ListOrderOutput): ListOrderOutputDto {
        return {
            orders: data.orders.map((order) => ({
                id: order.id,
                number: order.number,
                local: order.local,
                schedulingDate: order.schedulingDate,
                schedulingTime: order.schedulingTime,
                price: order.price,
                contact: order.contact,
                userId: order.userId,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            })),
            total: data.total,
            pages: data.pages,
            limit: data.limit,
        };
    };
};