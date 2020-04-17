export interface LoginRequest {
    username: string;
    password: string;
    rememberMe: boolean,
}

export interface LoginResponse {
    username: string;
    token: string;
    roles: string[],
}

