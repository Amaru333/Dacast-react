export enum ActionTypes {
    LOGIN_REQUEST = '@@register_login/LOGIN_REQUEST',
    LOGIN = '@@register_login/LOGIN',
    LOGIN_ERROR = '@@register_login/LOGIN_ERROR',
    LOGOUT = '@@register_login/LOGOUT'
}

export type LoginInfos = UserCredentials | MultiUserSelectedAccountCredentials

interface UserCredentials {
    email: string
    password: string
}

interface MultiUserSelectedAccountCredentials {
    selectedUserId: string
    loginToken: string
}

export interface TokenInfos {
    expires: number;
    token: string;
    refresh: string;
    loginToken?: string;
    email?: string
    availableUsers?: MultiUserSelectionInfo[];
    userId?: string;
    error?: boolean;
    accessToken?: string;
}

export interface MultiUserSelectionInfo {
    userId: string
    companyName: string
    companyWebsite: string
    role: string
}

export const defaultStateLogin: TokenInfos = {
    expires: NaN,
    token: '',
    refresh: '',
    userId: '',
    error: false
}