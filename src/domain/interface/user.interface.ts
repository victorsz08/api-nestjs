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

export interface UserInterface {
    create(user: UserEntity): Promise<void>;
    find(id: string): Promise<UserEntity>;
    list(query: ListUserInput): Promise<ListUserOutput>;
    update(id: string, username: string, firstName: string, lastName: string): Promise<void>;
    delete(id: string): Promise<void>;
};