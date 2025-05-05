import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthInterface, AuthPayload } from "src/domain/interface/auth.interface";
import { PrismaService } from "./prisma.service";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


const secret = process.env.JWT_SECRET || "00100";

@Injectable()
export class AuthService implements AuthInterface {
    constructor(private readonly repository: PrismaService) {};
    
    async login(username: string, password: string): Promise<AuthPayload> {
        const user = await this.repository.user.findUnique({ where: { username } });

        if (!user) {
            throw new HttpException("usuário ou senha inválidos", HttpStatus.BAD_REQUEST);
        };

        const validatePassword = await compare(password, user.password);
        if (!validatePassword) {
            throw new HttpException("usuário ou senha inválidos", HttpStatus.BAD_REQUEST);
        };

        const payload = sign({
            id: user.id,
            role: user.role,
        }, secret, {
            expiresIn: "1d",
        });

        return { token: payload };
    };
};