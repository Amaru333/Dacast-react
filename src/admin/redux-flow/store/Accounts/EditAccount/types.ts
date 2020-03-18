import { Flag } from '../List/types';

export enum ActionTypes {
    GET_ACCOUNT_INFO = "@@admin_accounts/GET_ACCOUNT_INFO",
    SAVE_ACCOUNT_INFO = "@@admin_accounts/SAVE_ACCOUNT_INFO"
}

export interface AccountInfo {
    id: string;
    companyName: string;
    userName: string;
    website: string;
    newPassword: string;
    phone: string;
    email: string;
    playbackProtection: string;
    emailVerified: boolean;
    accountFlags: Flag[];
}

export const editAccountDefaultState: AccountInfo = null;

