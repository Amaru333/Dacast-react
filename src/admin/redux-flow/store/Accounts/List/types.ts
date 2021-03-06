export enum ActionTypes {
    GET_ACCOUNTS = "@@admin_accounts/GET_ACCOUNTS",
    IMPERSONATE = "@@admin_accounts/IMPERSONATE"
}
export type Flag = 'admin' | 'adult' | 'chipped' | 'platinium' | 'partner' | 'banned' | 'paused' | 'suspended' | 'cancelled' | 'test'

export interface Account {
    userId: string;
    salesforceId: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    plan: string;
    // annualAmount: number;
    registeredDate: string;
    data: {
        allocated: number;
        consumed: number;
    };
    storage: {
        allocated: number;
        consumed: number;
    };
    encoding: {
        allocated: number;
        consumed: number;
    };
    isBanned: boolean | null;
    isAdult: boolean | null;
    isTest: boolean | null;
    isPlaybackBlocked: boolean | null;
}

export const accountsListInitialState: {users: Account[]; total: number} | false = false
