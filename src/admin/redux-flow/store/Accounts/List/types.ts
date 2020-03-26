export enum ActionTypes {
    GET_ACCOUNTS = "@@admin_accounts/GET_ACCOUNTS"
}
export type Flag = 'admin' | 'adult' | 'chipped' | 'platinium' | 'partner' | 'banned' | 'paused' | 'suspended' | 'cancelled' | 'test'

export interface Account {
    id: string;
    companyName: string;
    userName: string;
    phone: string;
    email: string;
    plan: string;
    annualAmount: number;
    registeredDate: number;
    data: string;
    storage: string;
    encoding: string;
    flags: Flag[];
}

export const accountsListInitialState: Account[] | false = false
