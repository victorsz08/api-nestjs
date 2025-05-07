import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SecurityInterface } from "../../domain/interface/security.inteface";
import { PrismaService } from "./prisma.service";
import { Role } from "../../domain/enum/role.enum";




@Injectable()
export class SecurityService implements SecurityInterface {
    constructor(private readonly repository: PrismaService) {}

    async recoveryAccess(userId: string, hash: string): Promise<void> {
        const user = await this.repository.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        await this.repository.user.update({
            where: { id: userId },
            data: {
                password: hash
            }
        });

        return;
    };

    async grantedAccess(userId: string, role: Role): Promise<void> {
        const user = await this.repository.user.findUnique({ where: { id: userId }});

        
        if(!user) {
            throw new HttpException("usuário não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        await this.repository.user.update({
            where: { id: userId },
            data: {
                role: role
            }
        });

        return;
    };
};