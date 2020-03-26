export enum ActionTypes {
    GET_BALANCES = "@@admin_paywall/GET_BALANCES"
}

export interface Balance {
    id: string;
    date: number;
    type: string;
    credit: number;
    debit: number;
    revenue: number
}

export interface AccountBalanceInfo {
    operations: Balance[];
    accountBalance: number;
}

export const balancesInitialState: AccountBalanceInfo | false = false
