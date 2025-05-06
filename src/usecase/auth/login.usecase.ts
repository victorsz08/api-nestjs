import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { AuthInterface } from "src/domain/interface/auth.interface";



export type AuthLoginInputDto = {
    username: string;
    password: string;
};

export type AuthLoginOutputDto = {
    token: string;
};



@Injectable()
export class AuthLoginUsecase implements Usecase<AuthLoginInputDto, AuthLoginOutputDto> {
    constructor(private readonly authInterface: AuthInterface) {};
    
    async execute(input: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
        const { username, password } = input;

        const authPayload = await this.authInterface.login(username, password);
        return authPayload;
    };
};

