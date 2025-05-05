

export type AuthPayload = {
    token: string;
};

export abstract class AuthInterface {
    abstract login(username: string, password: string): Promise<AuthPayload>;
};