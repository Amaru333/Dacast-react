export enum ActionTypes {
    LOGIN_REQUEST = '@@register_login/LOGIN_REQUEST',
    LOGIN = '@@register_login/LOGIN',
    LOGIN_ERROR = '@@register_login/LOGIN_ERROR',
    LOGOUT = '@@register_login/LOGOUT'
}

export interface LoginInfos {
    email: string;
    password: string;
}

export interface TokenInfos {
    expires: number;
    token: string;
    refresh: string;
    userId?: string;
    error?: boolean;
}

export const defaultStateLogin: TokenInfos = {
    expires: NaN,
    token: '',
    refresh: '',
    userId: '',
    error: false
}