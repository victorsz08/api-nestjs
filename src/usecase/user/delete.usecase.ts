import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { UserInterface } from "src/domain/interface/user.interface";



export type DeleteUserInputDto = {
    id: string;
};


export type DeleteUserOutputDto = void;


@Injectable()
export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: DeleteUserInputDto): Promise<void> {
        const { id } = input;

        await this.userInterface.delete(id);
        return;
    };
};