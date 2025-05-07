import { Injectable } from "@nestjs/common";
import { Role } from "../../domain/enum/role.enum";
import { Usecase } from "../usecase";
import { SecurityInterface } from "../../domain/interface/security.inteface";



export type GrantedAccessInputDto = {
    userId: string;
    role: Role;
};

export type GrantedAccessOutputDto = void;



@Injectable()
export class GrantedAccessUsecase implements Usecase<GrantedAccessInputDto, GrantedAccessOutputDto> {
    constructor(private securityService: SecurityInterface) {}

    async execute(input: GrantedAccessInputDto): Promise<GrantedAccessOutputDto> {
        const { userId, role } = input;

        await this.securityService.grantedAccess(userId, role);
        return;
    };
} 