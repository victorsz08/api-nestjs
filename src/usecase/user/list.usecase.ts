import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { ListUserOutput, UserInterface } from "src/domain/interface/user.interface";



export type ListUserInputDto = {
    page: number;
    limit: number;
    search?: string;
};

export type ListUserOutputDto = {
    users: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pages: number;
    limit: number;
    total: number;
};

@Injectable()
export class ListUserUsecase implements Usecase<ListUserInputDto, ListUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};

    async execute(input: ListUserInputDto): Promise<ListUserOutputDto> {
        const { page, limit, search } = input;

        const data = await this.userInterface.list({ page, limit, search });
        
        const output = this.present(data);
        return output;
    };

    private present(data: ListUserOutput): ListUserOutputDto {
        return {
            users: data.users.map(user => ({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })),
            pages: data.pages,
            limit: data.limit,
            total: data.total,
        }
    };
};