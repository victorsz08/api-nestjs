import { UserEntity } from "../entities/user.entity";


export type ListUserInput = {
    page: number;
    limit: number;
    search?: string;
};

export type ListUserOutput = {
    users: UserEntity[];
    pages: number;
    limit: number;
    total: number;
};

export abstract class UserInterface {
    abstract create(user: UserEntity): Promise<void>;
    abstract find(id: string): Promise<UserEntity>;
    abstract list(query: ListUserInput): Promise<ListUserOutput>;
    abstract update(id: string, username: string, firstName: string, lastName: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract updatePassword(id: string, newPassword: string): Promise<void>;
};