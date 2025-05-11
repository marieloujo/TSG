import { BearerToken } from "@core/types/bearer-token.type";

export enum Role {
    ADMIN = 'admin',
    STAFF = 'staff',
    PLAYER = 'player',
}

export interface User {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    role: Role
}

export interface LoginResponse {
    token: string,
    user: User
}
