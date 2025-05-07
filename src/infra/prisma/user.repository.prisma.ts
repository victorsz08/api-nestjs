import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserEntity } from "../../domain/entities/user.entity";
import { ListUserInput, ListUserOutput, UserInterface } from "../../domain/interface/user.interface";
import { PrismaService } from "./prisma.service";
import { Prisma } from "@prisma/client";
import { Role } from "../../domain/enum/role.enum";





@Injectable()
export class UserService implements UserInterface {
    constructor(private readonly repository: PrismaService) {}
    
    
    async updatePassword(id: string, newPassword: string): Promise<void> {
        
        await this.repository.user.update({
            where: {
                id
            },
            data: {
                password: newPassword
            }
        });

        return;
    };
    
    async create(user: UserEntity): Promise<void> {
        const {
            id,
            username,
            firstName,
            lastName,
            role,
            password,
            createdAt,
            updatedAt
        } = user;

        const usernameALreadyExists = await this.repository.user.findUnique({
            where: { username }
        });

        if(usernameALreadyExists) {
            throw new HttpException("username já existe", HttpStatus.BAD_REQUEST);
        };

        const data: Prisma.UserCreateInput = {
            id,
            username,
            name: firstName,
            lastname: lastName,
            role,
            password,
            createdAt,
            updatedAt
        };

        await this.repository.user.create({ data });
        return;
    };

    async find(id: string): Promise<UserEntity> {
        const user = await this.repository.user.findUnique({ where: { id }});
        if(!user) {
            throw new HttpException("user não encontrado com esse id", HttpStatus.NOT_FOUND);
        };

        return {
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role as Role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    };

    async list(query: ListUserInput): Promise<ListUserOutput> {
        const {
            page,
            limit,
            search
         } = query;

         const queryArgs: Prisma.UserFindManyArgs = {
            where: {},
            take: limit,
            skip: (page - 1) * limit,
         };

         const queryCount: Prisma.UserCountArgs = {
            where: {}
         };

         if(search) {
            queryArgs.where = {
                OR: [
                    { username: { 
                        contains: search, mode: "insensitive"
                    }},
                    { name: { 
                        contains: search, mode: "insensitive"
                    }},
                    { lastname: { 
                        contains: search, mode: "insensitive"
                    }},
                ]
            };

            queryCount.where = {
                OR: [
                    { username: { 
                        contains: search, mode: "insensitive"
                    }},
                    { name: { 
                        contains: search, mode: "insensitive"
                    }},
                    { lastname: { 
                        contains: search, mode: "insensitive"
                    }},
                ]
            };
         };

         const users = await this.repository.user.findMany(queryArgs);
         const total = await this.repository.user.count(queryCount);

         const pages = Math.ceil(total / limit);
         return {
            users: users.map((u) => ({
                id: u.id,
                username: u.username,
                firstName: u.name,
                lastName: u.lastname,
                role: u.role as Role,
                password: u.password,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt,
            })),
            pages,
            total,
            limit
         }
    };

    async update(id: string, username: string, firstName: string, lastName: string): Promise<void> {
        const user = await this.find(id);
        if(user.username !== username) {
            const usernameALreadyExists = await this.repository.user.findUnique({
                where: { username }
            });

            if(usernameALreadyExists) {
                throw new HttpException("username já existe", HttpStatus.BAD_REQUEST);
            };
        };

        const data: Prisma.UserUpdateInput = {
            username,
            name: firstName,
            lastname: lastName,
            updatedAt: new Date()
        };

        await this.repository.user.update({
            where: { id },
            data
        });

        return;
    };  

    async delete(id: string): Promise<void> {
        await this.find(id);
        await this.repository.user.delete({ where: { id }});

        return;
    };
};