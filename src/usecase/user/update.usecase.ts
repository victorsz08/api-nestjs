import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { UserInterface } from "../../domain/interface/user.interface";


export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export type UpdateUserOutputDto = void;


@Injectable()
export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: UpdateUserInputDto): Promise<void> {
        const { id, username, firstName, lastName } = input;
        
        await this.userInterface.update(id, username, firstName, lastName);
        return;
    };
};

