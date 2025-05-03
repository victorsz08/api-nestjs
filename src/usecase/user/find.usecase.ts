import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { UserInterface } from "src/domain/interface/user.interface";
import { UserEntity } from "src/domain/entities/user.entity";


export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

@Injectable()
export class FindUserUsecase implements Usecase<FindUserInputDto, FindUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const { id } = input;
        const data = await this.userInterface.find(id);

        const output = this.present(data);
        return output;
    };

    private present(data: UserEntity): FindUserOutputDto {
        return {
            id: data.id,
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    };
};