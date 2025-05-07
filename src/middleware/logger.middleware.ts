import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { UserEntity } from '../domain/entities/user.entity';

const SECRET = process.env.SECRET || "0010";

interface RequestCustom extends Request {
    user: Partial<UserEntity>;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: RequestCustom, res: Response, next: NextFunction) {
        const token = req.cookies["nt.token"]

        try {
            if (!token) {
                return res.status(401).json({ error: "Token não encontrado" });
            };

            verify(token, SECRET) 
            
            const user = decode(token) as Partial<UserEntity>;
            req.user = user;

            return next();
        } catch (error) {
            return res.status(401).json({ message: "Usuário não autorizado" })
        }
    }
}