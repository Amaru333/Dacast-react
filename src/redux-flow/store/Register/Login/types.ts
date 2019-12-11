export enum ActionTypes {
    LOGIN = '@@register_login/LOGIN'
}

export interface LoginInfos {
    username: string;
    password: string;
}

export interface TokenInfos {
    expires: string;
    token: string;
    refresh: string;
}

export const defaultStateLogin: TokenInfos = {
    expires: '',
    token: '',
    refresh: ''
}