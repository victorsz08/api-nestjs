import { Role } from "../enum/role.enum";



export class UserEntity {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
};