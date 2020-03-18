export enum ActionTypes {
    LOGIN = '@@register_login/LOGIN',
    LOGOUT = '@@register_login/LOGOUT'
}

export interface LoginInfos {
    email: string;
    password: string;
}

export interface TokenInfos {
    expires: string;
    token: string;
    refresh: string;
    userId?: string;
}

export const defaultStateLogin: TokenInfos = {
    expires: '',
    token: '',
    refresh: '',
    userId: ''
}