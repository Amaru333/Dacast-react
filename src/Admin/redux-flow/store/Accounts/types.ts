export enum ActionTypes {
    GET_ACCOUNTS = "@@accounts/GET_ACCOUNTS"
}

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
    flags: 'admin' | 'chipped' | 'platinium' | 'partner' | 'banned' | 'paused' | 'suspended' | 'cancelled' | 'test' [];
}