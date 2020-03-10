export enum ActionTypes {
    GET_ACCOUNTS = "@@accounts/GET_ACCOUNTS"
}
export type Flag = 'admin' | 'chipped' | 'platinium' | 'partner' | 'banned' | 'paused' | 'suspended' | 'cancelled' | 'test'
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

export interface AccountsState {
    accounts: false | Account[]
}

export const accountsInitialState: AccountsState = {
    accounts: false
}