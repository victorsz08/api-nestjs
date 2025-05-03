import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { UserInterface } from "src/domain/interface/user.interface";
import { UserEntity } from "src/domain/entities/user.entity";
import { Role } from "src/domain/enum/role.enum";

export type CreateUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type CreateUserOutputDto = void;


@Injectable()
export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: CreateUserInputDto): Promise<void> {
        const { username, firstName, lastName, password } = input;

        const data: UserEntity  = {
            id: uuid(),
            username,
            firstName,
            lastName,
            role: Role.USER,
            password: await hash(password, 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.userInterface.create(data);
        return;
    };
};

