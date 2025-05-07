import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { UserInterface } from "../../domain/interface/user.interface";
import { compare, hash } from "bcryptjs";


export type UpdatePasswordInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string; 
};

export type UpdatePasswordOutputDto = void;


@Injectable()
export class UpdatePasswordUsecase implements Usecase<UpdatePasswordInputDto, UpdatePasswordOutputDto> {
    constructor(private readonly userInterface: UserInterface) {};
    
    async execute(input: UpdatePasswordInputDto): Promise<void> {
        const { id, currentPassword, newPassword } = input;

        const user = await this.userInterface.find(id);
        const validatePassword = await compare(currentPassword, user.password);

        if(!validatePassword) {
            throw new HttpException("senha atual incorreta", HttpStatus.BAD_REQUEST);
        };
        
        const passwordHashed = await hash(newPassword, 10);

        await this.userInterface.updatePassword(id, passwordHashed);
        return;
    };
};