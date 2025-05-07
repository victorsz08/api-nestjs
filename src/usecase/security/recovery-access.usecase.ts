import { Injectable } from "@nestjs/common";
import { Usecase } from "../usecase";
import { SecurityInterface } from "../../domain/interface/security.inteface";
import { hash } from "bcryptjs";




export type RecoveryAccessInputDto = {
    userId: string;
};


export type RecoveryAccessOutputDto = {
    password: string;
};


@Injectable()
export class RecoveryAccessUsecase implements Usecase<RecoveryAccessInputDto, RecoveryAccessOutputDto> {
    constructor(private securityService: SecurityInterface) {}

    async execute(input: RecoveryAccessInputDto): Promise<RecoveryAccessOutputDto> {
        const { userId } = input;

        const passwordRandom = Math.random().toString(36).slice(-8);
        const passwordHash = await hash(passwordRandom, 10);
        
        await this.securityService.recoveryAccess(userId, passwordHash);
        return {
            password: passwordRandom
        };
    };
};