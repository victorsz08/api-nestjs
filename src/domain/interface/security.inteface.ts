import { Role } from "../enum/role.enum";

export abstract class SecurityInterface {
    abstract recoveryAccess(userId: string, hash: string): Promise<void>;
    abstract grantedAccess(userId: string, role: Role): Promise<void>;
};